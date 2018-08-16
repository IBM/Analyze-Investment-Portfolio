
from flask import Flask, render_template, jsonify, json, url_for, request, redirect, Response, flash, abort, make_response, send_file
import requests
import io
import os
import csv
import datetime
import investmentportfolio

print ('Running Portfolio Analyze')
app = Flask(__name__)

# On Bluemix, get the port number from the environment variable VCAP_APP_PORT
# When running this app on the local machine, default the port to 8080
port = int(os.getenv('VCAP_APP_PORT', 8080))
host='0.0.0.0'

# I couldn't add the services to this instance of the app so VCAP is empty
# do this to workaround for now
if 'VCAP_SERVICES' in os.environ:
    if str(os.environ['VCAP_SERVICES']) == '{}':
        print ('Using a file to populate VCAP_SERVICES')
        with open('VCAP.json') as data_file:
            data = json.load(data_file)
        os.environ['VCAP_SERVICES'] = json.dumps(data)

#======================================RUN LOCAL======================================
# stuff for running locally
if 'RUN_LOCAL' in os.environ:
    print ('Running locally')
    port = int(os.getenv('SERVER_PORT', '5555'))
    host = os.getenv('SERVER_HOST', 'localhost')
    with open('VCAP.json') as data_file:
        data = json.load(data_file)
    os.environ['VCAP_SERVICES'] = json.dumps(data)

#======================================MAIN PAGES======================================
@app.route('/')
def run():
    """
    Load the site page
    """
    return render_template('index.html')

#======================================DATABASE MANAGEMENT==============================
@app.route('/api/upload', methods=['POST'])
def portfolio_from_csv():
    """
    Loads a portfolio in Algo Risk Service (ARS) format into the Investment Portfolio service.
    """
    holdings = {
        'timestamp':'{:%Y-%m-%dT%H:%M:%S.%fZ}'.format(datetime.datetime.now()),
        'holdings':[]
    }
    data = json.loads(request.data)
    data = [row.split(',') for row in data]
    headers = data[0]
    #Loop through and segregate each portfolio by its identifier (there may be multiple in the file)
    #Column 1 (not 0) is the ID column. Column 5 is the PORTFOLIO column...
    portfolios = {}
    navs = {}
    unique_id_col =  headers.index("UNIQUE ID")
    id_type_col =  headers.index("ID TYPE")
    name_col =  headers.index("NAME")
    ticker_col = headers.index("TICKER")
    pos_units_col =  headers.index("POSITION UNITS")
    portfolio_col =  headers.index("PORTFOLIO")
    price_col =  headers.index("PRICE")
    currency_col =  headers.index("CURRENCY")

    #for d in data...
    for d in data[1:]:
        hldg = {
            "name":d[name_col],
            "instrumentId":d[unique_id_col],
            "quantity":d[pos_units_col]
        }
        if len(headers)>5:
            for meta in headers[6:]:
                hldg[meta.replace('\r','')] = d[headers.index(meta)].replace('\r','')

        if d[portfolio_col] not in portfolios:
            portfolios[d[portfolio_col]] = [hldg]
        else:
            portfolios[d[portfolio_col]].append(hldg)

    #Send each portfolio and its holdings to the investment portfolio service
    for key, value in portfolios.items():
        my_portfolio = {
            "timestamp": '{:%Y-%m-%dT%H:%M:%S.%fZ}'.format(datetime.datetime.now()) ,
            'closed':False,
            'data':{'type':'look through portfolio'},
            'name':key
        }

        #create portfolio
        try:
            req  = investmentportfolio.Create_Portfolio(my_portfolio)
        except:
            print("Unable to create portfolio for " + str(key) + ".")

        try:
            for h in range(0,len(value),100):
                hldgs = value[h:h+100]
                req  = investmentportfolio.Create_Portfolio_Holdings(str(key),hldgs)
        except:
            print("Unable to create portfolio holdings for " + str(key) + ".")
    return req


#Returns list of 'look through' portfolios
@app.route('/api/look_through_portfolios',methods=['GET'])
def get_look_through_portfolios():
    '''
    Returns the available user portfolio names in the Investment Portfolio service.
    Uses type='user_portfolio' to specify.
    '''
    portfolio_names = []
    res = investmentportfolio.Get_Portfolios_by_Selector('type','look through portfolio')
    try:
        for portfolios in res['portfolios']:
            portfolio_names.append(portfolios['name'])
        #returns the portfolio names as list
        print("Portfolio_names:" + str(portfolio_names))
        return Response(json.dumps(portfolio_names), mimetype='application/json')
    except:
        return "No portfolios found."

#Deletes all look through holdings and portfolios for cleanup
@app.route('/api/look_through_delete',methods=['GET'])
def get_look_through_delete():
    '''
    Deletes all portfolios and respective holdings that are of type 'look through'
    '''
    portfolios = investmentportfolio.Get_Portfolios_by_Selector('type','look through portfolio')['portfolios']
    print(portfolios)
    for p in portfolios:
        holdings = investmentportfolio.Get_Portfolio_Holdings(p['name'],False)
        # delete all holdings
        for h in holdings['holdings']:
            timestamp = h['timestamp']
            rev = h['_rev']
            investmentportfolio.Delete_Portfolio_Holdings(p['name'],timestamp,rev)
        investmentportfolio.Delete_Portfolio(p['name'],p['timestamp'],p['_rev'])
    return "Portfolios deleted successfully."

#======================================LOOK THROUGH CALCULATIONS==============================
#Returns list of 'look through' portfolios with the additional portfolio
def get_universe(portfolio):
    #portfolio object as input
    universe = portfolio
    look_throughs = [item["TICKER"] for item in portfolio if item["HAS_LOOKTHROUGH"] == 'TRUE']

    for l in look_throughs:
        #Get fund's individual holdings
        fund = investmentportfolio.Get_Portfolio_Holdings(l,False)['holdings']
        fund = [item['holdings'] for item in fund] #since we loaded the data in chunks originally
        fund = [item for sublist in fund for item in sublist] #flatten the list
        universe += [item for item in fund if item['TICKER'] != '']

    return universe

#Returns an augmented universe with effective portfolio value per security (in case there's a significant difference in processing time with the above)
def get_expanded_universe(portfolio):
    #portfolio object as input
    universe = portfolio
    for p in portfolio:
        p.update({'portfolio_value':float(p['quantity'])*float(p['PRICE']),'user_portfolio':True})

    look_throughs = [item["TICKER"] for item in portfolio if item["HAS_LOOKTHROUGH"] == 'TRUE']
    for l in look_throughs:
        #Get fund's NAV from user portfolio (that's where the data lives) and our exposure to that fund (in $)
        fund_NAV = [float(item['FUND_NAV']) for item in portfolio if item['TICKER'] == l][0]
        exposure_to_fund = [(float(item['quantity'])*float(item['PRICE'])) for item in portfolio if item['TICKER'] == l][0]

        #Get fund's individual holdings
        fund = investmentportfolio.Get_Portfolio_Holdings(l,False)['holdings']
        fund = [item['holdings'] for item in fund] #since we loaded the data in chunks originally
        fund = [item for sublist in fund for item in sublist] #flatten the list

        #calculate effective dollar exposure to each fund based on market value in parent portfolio
        for f in fund:
            #errors in csv file formats can cause issues here
            try:
                f.update({'portfolio_value':((float(f['quantity']) *float(f['PRICE']))/ fund_NAV) * exposure_to_fund,'user_portfolio':False})
            except:
                print('look at ' + str(f['name']))
        universe += fund
    return universe

@app.route('/api/search-universe/<portfolio>',methods=['GET','POST'])
def search_universe(portfolio):
    '''
    Returns the total list of securities touched by an investment portfolio (e.g. including look-throughs).
    '''
    if request.method == 'POST':
        req = request.get_json(silent=True)
        portfolio = req['portfolio']

    portfolio = investmentportfolio.Get_Portfolio_Holdings(portfolio,False)['holdings'] # client portfolio
    portfolio = [item['holdings'] for item in portfolio] #since we loaded the data in chunks originally
    portfolio = [item for sublist in portfolio for item in sublist] #flatten the list'

    universe = get_universe(portfolio)
    universe = [item['name'] + ' (' + item['TICKER'] + ')' for item in universe]

    return Response(json.dumps(universe), mimetype='application/json')

@app.route('/api/portfolio-composition',methods=['POST'])
def portfolio_composition():
    '''
    Returns a list of aggregations (e.g. geography, sector) and their portfolio value per member currently in dollar value terms.
    '''
    if request.method == 'POST':
        req = request.get_json(silent=True)
        portfolio = investmentportfolio.Get_Portfolio_Holdings(req['portfolio'],False)['holdings'] # client portfolio
        portfolio = [item['holdings'] for item in portfolio] #since we loaded the data in chunks originally
        portfolio = [item for sublist in portfolio for item in sublist] #flatten the list'
        aggregations = req["aggregations"] # aggregations to compute

    NAV = sum(float(item['quantity'])*float(item['PRICE']) for item in portfolio)
    universe = get_expanded_universe(portfolio)
    exposures = {"NAV":NAV}
    for a in aggregations:
        values = {}
        #get unique entries for the given aggregation (keep an eye out for python3 quirks)
        unique_a = {item[a]:item[a] for item in universe}.values()
        for u in unique_a:
            values[u] = sum([item['portfolio_value'] for item in universe if item[a]==u])
        exposures[a] = values

    return Response(json.dumps(exposures), mimetype='application/json')

@app.route('/api/portfolio-analyze/<portfolio>',methods=['GET','POST'])
def portfolio_analyze(portfolio):
    '''
    Returns data compatible with the Portfolio.Analyze() v1.0 front-end GUI
    '''
    if request.method == 'POST':
        req = request.get_json(silent=True)
        portfolio = req['portfolio']

    portfolio_name = portfolio #persist name
    portfolio = investmentportfolio.Get_Portfolio_Holdings(portfolio,False)['holdings'] # client portfolio
    portfolio = [item['holdings'] for item in portfolio] #since we loaded the data in chunks originally
    portfolio = [item for sublist in portfolio for item in sublist] #flatten the list'
    #print([item['name'] for item in portfolio])
    aggregations = ["geography","Asset Class","sector","has_Tobacco","has_Alcohol","has_Gambling","has_Military","has_Fossil Fuels","esg_Controversy","esg_Environmental","esg_Governance","esg_Social","esg_Sustainability"]

    NAV = sum(float(item['quantity'])*float(item['PRICE']) for item in portfolio)
    response = {
        "NAV":NAV,
        'sin':{},
        'esg':{portfolio_name:{}},
        'search':[], # search universe
        'portfolio':[{'name':item['name'],'value ($USD)':(float(item['quantity'])*float(item['PRICE'])),'Portfolio Contribution (%)':((float(item['quantity'])*float(item['PRICE']))/NAV)*100,'Industry Sector':item['sector'],'Asset Class':item['Asset Class'],'Geography':item['geography']} for item in portfolio],
        'composition':{}
    }
    universe = get_expanded_universe(portfolio)
    response['search'] = list(set([item['name'] + ' (' + item['TICKER'] + ')' for item in universe]))

    #hard-coded benchmarks for now, as it's possible a user would want to make benchmark choices static...
    benchmarks = ['IVV','HYG','LQD']
    for b in benchmarks:
        response['esg'][b] = {}

    #Calculate data for response
    for a in aggregations:
        #sin stocks - just need true
        if 'has_' in a:
            #we omit the parent funds in the portfolio (has_lookthrough=true) to avoid double counting the exposure
            response['sin'][a] = sum([item['portfolio_value'] for item in universe if item[a]=='TRUE' if item['HAS_LOOKTHROUGH']=='FALSE'])
        #esg
        elif 'esg_' in a:
            #compute average ESG for the portfolio (and benchmarks!)
            response['esg'][portfolio_name][a] = sum([(item['portfolio_value']/NAV)*float(item[a]) for item in universe if item['HAS_LOOKTHROUGH']=='FALSE'])
        #regular aggregations
        else:
            values = {}
            #get unique entries for the given aggregation (keep an eye out for python3 quirks)
            unique_a = {item[a]:item[a] for item in universe}.values()
            for u in unique_a:
                values[u] = sum([item['portfolio_value'] for item in universe if item[a]==u if item['HAS_LOOKTHROUGH']=='FALSE'])
            response['composition'][a] = values

    #get ESG data for benchmarks
    for b in benchmarks:
        portfolio = investmentportfolio.Get_Portfolio_Holdings(b,False)['holdings']
        portfolio = [item['holdings'] for item in portfolio] #since we loaded the data in chunks originally
        portfolio = [item for sublist in portfolio for item in sublist] #flatten the list'
        b_universe = get_expanded_universe(portfolio)
        b_NAV = sum(float(item['quantity'])*float(item['PRICE']) for item in portfolio)
        for a in aggregations:
            if 'esg_' in a:
                #compute average ESG for the portfolio (and benchmarks!)
                response['esg'][b][a] = sum([(item['portfolio_value']/b_NAV)*float(item[a]) for item in b_universe if item['HAS_LOOKTHROUGH']=='FALSE'])
    #create world investment json for the D3 element
    create_world_json(response['composition']["geography"])

    return Response(json.dumps(response), mimetype='application/json')


#Returns list of 'look through' portfolios (returns results)
@app.route('/api/search/<portfolio>/<security>',methods=['GET','POST'])
def search(portfolio,security):
    '''
    Returns details around the true presence of a given security [by ticker for now] in a portfolio.
    '''
    if request.method == 'POST':
        req = request.get_json(silent=True)
        portfolio = req["portfolio"]
        security = req["security"] # security to check

    portfolio = investmentportfolio.Get_Portfolio_Holdings(portfolio,False)['holdings'] # client portfolio
    portfolio = [item['holdings'] for item in portfolio] #since we loaded the data in chunks originally
    portfolio = [item for sublist in portfolio for item in sublist] #flatten the list'


    NAV = sum(float(item['quantity'])*float(item['PRICE']) for item in portfolio)
    universe = get_expanded_universe(portfolio)
    exposures = {"NAV":NAV}
    #get unique entries for the given aggregation (keep an eye out for python3 quirks)
    securities = [item for item in universe if item['TICKER']==security]
    #get esg data from the first instance (since they theoretically should all be the same for the same security)
    esg_data = {}
    price = sum(float(item['PRICE']) for item in securities)
    for key,value in securities[0].items():
        if 'esg_' in key:
            esg_data[key] = value

    exposures = {
        "NAV":NAV,
        "security":security,
        "price": price,
        "direct":sum([item['portfolio_value'] for item in securities if item['user_portfolio'] == True]),
        "indirect":sum([item['portfolio_value'] for item in securities if item['user_portfolio'] == False]),
        "esg":esg_data
    }
    return Response(json.dumps(exposures), mimetype='application/json')


def create_world_json(data):
    #print("create world json")
    #print(data)

    with open('static/js/geography/world_investment_default.json','r') as inFile:
          #print("open file")
          jsonData = json.load(inFile)
          inFile.close()

    #print("world investment json")
    #print(jsonData)

    dataLength = len(jsonData)

    for x in range(0, dataLength):
        for key in data:
            if (jsonData[x]["name"] == key):
                jsonData[x]["investments"] = data[key]

    #print (jsonData)

    with open('static/js/geography/world_investment.json','w') as outfile:
          json.dump(jsonData, outfile)
          outfile.close()


if __name__ == '__main__':
    app.run(host=host, port=port)
