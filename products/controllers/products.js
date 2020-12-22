const Products = require('../models/products');
// module.exports =Products;
const createProduct = async (req, res) => {
    try {
      req.body.isPublished=false;
      const product = await Products.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }

  const findAll = async (req, res) => {
    try {
      const products = await Products.findAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }

  const patchOne = async (req, res) => {
    try {
        const product = await Products.findByPk(parseInt(req.params.id));
        
        if(product.mrp<product.price&&product.stock==0){
            return res.status(422).json(["MRP should be less than equal to the Price", "Stock count is 0"]);
        }
        else if(product.mrp<product.price){
            return res.status(422).json(["MRP should be less than equal to the Price"]);
        }
        else if (product.stock==0){
            return res.status(422).json([ "Stock count is 0"]);
        }
        else{
            const pp=await Products.update(req.body, {
                where: { id: req.params.id }
              })
              return res.status(204).json("");
        }
     
       
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }
  
  const noAccess = async (req, res) => {
    try {
      
        return res.status(405).json("");
       
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }
  


  module.exports = {
    createProduct,
    findAll,
    patchOne,
    noAccess
  }