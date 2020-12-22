const { Op } = require('sequelize')
const Analytics = require('../models/analytics');
const {subtractSecondsFromCurrentTime} = require('../utils');

const createAnalytics = async (req, res) => {
    try {
        const lessThan3Sec=subtractSecondsFromCurrentTime(3);
        const lessThan5Sec=subtractSecondsFromCurrentTime(5);
        let ingestCount=0;
        for(let element of req.body){
            let save=true;
            if(element.eventType.toLowerCase()=="click"){
                const matchingEvent=await Analytics.findOne({
                    where:{
                        user:element.user,
                        eventType:element.eventType,
                        date:{
                            [Op.gte]:lessThan3Sec
                        }
                    }
                })
                save=(matchingEvent==null)? true:false;
                console.log(element.eventType,"   ",save)

            }else{
                const matchingEvent=await Analytics.findOne({
                    where:{
                        user:element.user,
                        eventType:element.eventType,
                        date:{
                            [Op.gte]:lessThan5Sec
                        }
                    }
                })
                save=(matchingEvent==null)? true:false;
                // console.log(element.eventType,"   ",save)
            }
            if(save){
                element.date=new Date()
                await Analytics.create(element);
                ingestCount++;
            }
        }
      return res.status(201).json({"ingested":ingestCount});
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }

  const findAll = async (req, res) => {
    try {
      const analytics = await Analytics.findAll();
      return res.status(200).json(analytics);
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
    createAnalytics,
    findAll,
    noAccess
  }