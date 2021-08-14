// Hired.com assessment

let inputData = {
  additional_flat_fees_name_0: "Some Flat Fee",
  additional_flat_fees_rate_0: "23",
  admin_fees_delineate_0: false,
  admin_fees_delineate_2: true,
  admin_fees_name_0: "Admin Fee 1",
  admin_fees_name_1: "Admin Fee 2",
  admin_fees_name_2: "Admin Fee 3",
  admin_fees_rate_0: 1.2,
  admin_fees_rate_1: "0",
  admin_fees_rate_2: "24",
  admin_fees_type_0: "admin_fee_pmpm",
  admin_fees_type_1: "admin_fee_pepm",
  admin_fees_type_2: "admin_fee_pmpm",
};
let raw_json = JSON.stringify(inputData)

let input = JSON.parse(raw_json)
let output = {}

let keysArray = Object.keys(input).map( (k) => k.split("_") )
keysArray.map( (k) => {
    let objectKey = ""
    for(let i=0; i<k.length-2; i++ ) {
        objectKey += k[i] + "_"
    }
    objectKey = objectKey.slice(0,-1) // remove trailing _

    let objectKeyIndex = k[k.length-1]
    let objectKeyName = k[k.length-2]
    let inputKey =  objectKey +"_"+ objectKeyName +"_"+ objectKeyIndex 

    let finalKey =  objectKey +"["+ objectKeyIndex + "]." + objectKeyName  +" = " + input[inputKey]
    console.log(finalKey)

    if ( output[objectKey] === undefined ) {
        output[objectKey] = []
    }
    if ( output[objectKey][objectKeyIndex] === undefined ) {
        output[objectKey][objectKeyIndex] = {}
    }
    output[objectKey][objectKeyIndex][objectKeyName] = input[inputKey]
    
})

console.log({output})

let outputJson = JSON.stringify(output)

let outputFinal = {
    "additional_flat_fees": [
        {
            "name": "Some Flat Fee",
            "rate": "23"
        }
    ],
    "admin_fees": [
        {
            "delineate": false,
            "name": "Admin Fee 1",
            "rate": 1.2,
            "type": "admin_fee_pmpm"
        },
        {
            "name": "Admin Fee 2",
            "rate": "0",
            "type": "admin_fee_pepm"
        },
        {
            "delineate": true,
            "name": "Admin Fee 3",
            "rate": "24",
            "type": "admin_fee_pmpm"
        }
    ]
}

let outputFinalJson = JSON.stringify(outputFinal)

console.log(outputJson === outputFinalJson)
