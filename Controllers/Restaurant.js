const Restaurant = require('../Models/Restaurant');  // importing the Restaurant Model
const Item = require('../Models/Item');

// filter function to filter the data based on multiple params
exports.filterSearch = (req, res, next) => {
    let {mealtype,cuisine,location,lcost,hcost,page,sort} =req.body;

    //  ternary operator 

    page = page ? page:1;

    sort = sort? sort:1 // 1 is for asending and -1 is for descending in javascript 

    let payload ={};

    const itemPerPage= 2;
    let startIndexofPage = itemPerPage* page-itemPerPage; // 2*3-2 =4 (4 will be the starting page of 3)
    let endIndex  = itemPerPage*page ; //2*3 

    if(mealtype){
        payload['type.mealtype'] =mealtype;
    }

    if(mealtype && cuisine){
        payload['type.mealtype'] =mealtype;
        payload['Cuisine.cuisine'] ={$in:cuisine}
        }

        if(mealtype&& lcost&& hcost){ //split function  to extract lcost and hcost  delimitor -  (500-1000 )
        payload['type.mealtype'] =mealtype;
        payload["cost"] ={$lte:hcost ,$gte:lcost};
        }

        if (mealtype&& lcost&& hcost&&  cuisine){
            payload['type.mealtype'] =mealtype;
            payload["cost"] ={$lte:hcost ,$gte:lcost};
        payload['Cuisine.cuisine'] ={$in:cuisine}

        }

        if(mealtype&&location){
            payload['type.mealtype'] =mealtype;
          payload['locality'] =location
        }


        if(mealtype&&location&&cuisine){
            payload['type.mealtype'] =mealtype;
            payload['locality'] =location
        payload['Cuisine.cuisine'] ={$in:cuisine}

        }

        if (mealtype&&location&&lcost&& hcost){
            payload['type.mealtype'] =mealtype;
            payload['locality'] =location
        payload["cost"] ={$lte:hcost ,$gte:lcost};

        }

        if(mealtype&&location&&lcost&& hcost&&cuisine){
            payload['type.mealtype'] =mealtype;
            payload['locality'] =location
        payload["cost"] ={$lte:hcost ,$gte:lcost};
        payload['Cuisine.cuisine'] ={$in:cuisine}

        }

        Restaurant.find(payload).sort({cost:sort})
        .then(response =>{
            const filteredResponse = response.slice(startIndexofPage,endIndex);
            res.status(200).json({
                message:"Restaurants fetched Successfully",
                restaurants :filteredResponse
            })
        }).catch(err=>{
            res.status(400).json({error:err});
        })
}

// getRestaurantByCity function to get restaurants by city name
exports.getRestaurantByCity = (req, res) => {
    // const cityId = req.query.city;
    Restaurant.find({ "city": req.query.city }).then(result => { 
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurantList: result })
    }).catch(err => console.log(err));
}

// getItemsByRestaurant function to get Items by rest name
exports.getItemsByRestaurant = (req, res) => {
    const resId = req.params.resId;
    Item.find({ restaurantId: resId }).then(result => {
        res.status(200).json({ message: "Restaurant Items Fetched Sucessfully", itemsList: result })
    }).catch(err => console.log(err));
}

// getRestaurantById function to get restaurants by Id
exports.getRestaurantById = (req, res, next) => {
    const resId = req.params.resId;
    Restaurant.findById(resId).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: result })
    }).catch(err => console.log(err));
}

// addRestaurantList function to add restaurants to DB
exports.addRestaurantList = (req, res, next) => {
    const name = req.body.name;
    const city_id = req.body.city_id;
    const location_id = req.body.location_id;
    const locality =req.body.locality;
    const thumb=req.body.thumb;
    const city=req.body.city;
    const area=req.body.area;
    const address=req.body.address;
    const cost=req.body.cost;
    const type=req.body.type;
    const mealtype=req.body.mealtype;
    const Cuisine=req.body.Cuisine;
    const cuisine=req.body.cuisine;
    const contact =req.body.contact;

    const Rest = new Restaurant({ name: name, locality: locality, location_id: location_id,thumb:thumb,city_id:city_id ,city:city,area:area,address:address,cost:cost,type:type,mealtype:mealtype,Cuisine:Cuisine,cuisine:cuisine,contact:contact});
    Rest.save().then(result => {
        res.status(200).json({ message: "Restaurant Added Sucessfully", restaurant: result })
    }).catch(err => {
        console.log(err)
    })
}