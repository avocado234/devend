from pymongo.mongo_client import MongoClient
from flask import Flask,jsonify,request
from flask_cors import CORS,cross_origin
#initial
app = Flask(__name__)
uri ="mongodb+srv://thitsanu25:Avocadoo.13124@cluster0.l40hdec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
def get_mongo_client():
    return MongoClient(uri)

@app.route("/")
def Greet():
    return "<center><p>Welcome to Products Management API </p></center>"

@app.route("/products", methods=["GET"])
def show_all_student():
    try:
        client = get_mongo_client()
        db = client["Product"]
        collection = db["Product"]
        all_students = list(collection.find())
        return jsonify(all_students)
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        client.close()

@app.route("/products/<int:prod_id>", methods=["GET"])
def get_student_by_id(prod_id):
    try:
        client = get_mongo_client()
        db = client["Product"]
        collection = db["Product"]
        product = collection.find_one({"_id": prod_id})
        if not product:
            return jsonify({"error": "Product not found"}), 404
        return jsonify(product)
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        client.close()
@app.route("/products", methods=["POST"])
def add_std():
    try:
        client = get_mongo_client()
        db = client["Product"]
        collection = db["Product"]
        data = request.get_json()
        newdata ={
            "_id":data["_id"],
            "name":data["name"],
            "price":data["price"],
            "img":data["img"]
        }
        already_data = collection.find_one({"_id": data.get("_id")})
        if already_data:
            return jsonify({"error":"Cannot create new product"}), 500
        collection.insert_one(newdata)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        client.close()
@app.route("/products/<int:prod_id>", methods=["PUT"])
@cross_origin()
def update_student(prod_id):
    try:
        client = get_mongo_client()
        db = client["Product"]
        collection = db["Product"]
        data = request.get_json()
        product_data = collection.find_one({"_id": prod_id})
        if not product_data:
            return jsonify({"error":"Product not found"}), 404
        collection.update_one({"_id":prod_id},{"$set": data})
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        client.close()
@app.route("/products/<int:prod_id>", methods=["DELETE"])
@cross_origin()
def delete_student(prod_id):
    try:
        client = get_mongo_client()
        db = client["Product"]
        collection = db["Product"]
        product_data = collection.find_one({"_id": prod_id})
        if not product_data:
            return jsonify({"error":"Product not found"}), 404
        collection.delete_one({"_id": prod_id})
        return jsonify({"message":"Product deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        client.close()

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)