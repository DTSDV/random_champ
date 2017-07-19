from flask import Flask, render_template, session, request
from random import randint
from champions import champions
import json

app = Flask(__name__)
app.secret_key = 'testtest'

@app.route('/', methods=['GET','POST'])
def index():

    faction = request.form.getlist('faction')
    ad_ap = request.form.getlist('ad-ap')
    role = request.form.getlist('role')
    champ_filter = session['formdata']
    champ_list = []

    for champ in champions:
        # Checking filters
        if len([i for i in champ['ad-ap'] if i in ad_ap]) > 0 \
                and champ['faction'] in faction \
                and champ['name'] in champ_filter \
                and len([j for j in champ['role'] if j in role]) > 0:
            champ_list += [champ['name']]

    # If there are zero champion possibilities, output none
    try:
        chosen_champ = champ_list[randint(0, len(champ_list)-1)]
    except:
        chosen_champ = 'None'

    return render_template('index.html',
                           chosen_champ=chosen_champ,
                           faction=faction,
                           ad_ap=ad_ap,
                           champ_filt=champ_filter)

# Champ select page
@app.route('/champselect/', methods=['GET','POST'])
def champselect():

    # Read list of all champions from a text file
    f = open('listofchamps.txt', 'r')
    champlist = []
    temp = f.readlines()[:56:2]
    for champ in temp:
        champlist += [champ.replace('\n', '')]

    if request.method == 'POST':
        cf = request.json
        session['formdata'] = cf
        if 'formdata' in session:
            return json.dumps(session['formdata'])
    return render_template('champ_select.html', champlist=champlist)

# About page
@app.route('/about/')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
    app.config['SESSION_TYPE'] = 'filesystem'