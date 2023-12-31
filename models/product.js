const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  async save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      dbOp = await db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = await db.collection("products").insertOne(this);
    }

    return dbOp;
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // static findById(prodId) {
  //     const db = getDb();
  //     db.collection('products').find({ _id:new mongodb.ObjectId(prodId) }).next().then(product => {
  //         console.log(product);
  //         return product;
  //     }).catch(err => {
  //         console.log(err);
  //     })

  // }
  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Propagate the error further if needed
      });
  }


  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
        .then(result => {
            console.log('Deleted');
        })
        .catch(err => {
            console.log(err);
            throw err; // Propagate the error to the calling function
        });
}
}

module.exports = Product;
