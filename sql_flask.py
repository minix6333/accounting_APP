from flask import Flask,jsonify,request
#返回序列json資料
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
import datetime
from flask_marshmallow import Marshmallow
from sqlalchemy import extract
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:@localhost:3306/web"
app.config['SQLAlCHEMY_TRACK_MODIFICATION'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    assets = db.Column(db.VARCHAR(20), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    income = db.Column(db.Integer, nullable=False)
    content = db.Column(db.VARCHAR(100), nullable=False)
    def __init__(self , date  , assets , price , income , content ) :
        self.date = date
        self.assets = assets
        self.price = price
        self.income = income
        self.content = content


#定義序列化
class db_sch(ma.Schema):
    class Meta:
        fields = ('id','date','assets','price', 'income' ,'content')

article_db= db_sch()
articles_db = db_sch(many=True)


@app.route("/add" , methods=["POST"])
def add_account():
    date = request.json["date"]
    assets = request.json["assets"]
    price = request.json["price"]
    income = request.json["income"]
    content = request.json["content"]
    newuser = Account(date  , assets , price , income ,content )
    db.session.add(newuser)
    db.session.commit()
    return  article_db.jsonify(newuser)

@app.route('/get', methods=['GET'])
def get_account():
    all_account = Account.query.all()
    results = articles_db.dump(all_account)
    return jsonify(results)

@app.route('/get_new' , methods=['GET'])
def get_new():
    new_account = Account.query.order_by(desc(Account.id)).first()
    result = article_db.dump(new_account)
    return jsonify(result)


@app.route('/get/<id>/', methods=['GET'])
def get_details(id):
    taccount = Account.query.get(id)
    return article_db.jsonify(taccount) 

@app.route('/up/<id>/', methods=['PUT'])
def update_account(id):
    account = Account.query.get(id)
    date = request.json['date']
    assets = request.json['assets']
    price = request.json['price']
    income = request.json['income']
    content = request.json['content']
    account.date =date
    account.assets =assets
    account.price =price
    account.income =income
    account.content =content
    db.session.commit()
    return article_db.jsonify(account)


@app.route('/dt/<id>/', methods=['DELETE'])
def delete_toilet(id):
    account = Account.query.get(id)
    db.session.delete(account)
    db.session.commit()
    return article_db.jsonify(account)

@app.route('/gm/<int:month>', methods=['GET'])
def get_month(month):
    gm = Account.query.filter(extract('month',Account.date) == month).all()
    return articles_db.jsonify(gm)

@app.route('/gy/<int:year>', methods=['GET'])
def get_year(year):
    gy = Account.query.filter(extract('year',Account.date) == year).all()
    return articles_db.jsonify(gy)

if __name__ == "__main__":
    # db.create_all()
    app.run(host = '192.168.1.107' , port=3000 , debug=True)
    # 61602