const pd=require('node-pandas')

const extractHabitablePlanets=()=>{

    
    df=pd.readCsv("./kepler_data.csv")
    
    let result=[]
    
    for(let i=0;i<df.length;i++){
        let obj=df[i]
        if(obj.koi_disposition==='CONFIRMED' && (obj.koi_insol>=0.36 && obj.koi_insol<=1.11) && (obj.koi_prad<1.6)){
            result.push(obj)
        }
    }
    return result;
}

result=extractHabitablePlanets()
console.log(result)
console.log("Number of habitable planets : ",result.length)