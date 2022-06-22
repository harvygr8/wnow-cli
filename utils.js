const isValidCoords = (lat,long) =>{
  if(isNaN(lat) || isNaN(long)){
    return false;
  }
  else if(parseFloat(lat)<-90 || parseFloat(lat)>90 || parseFloat(long)<-180 || parseFloat(long)>180){
    return false;
  }
  return true;
}

module.exports={isValidCoords}
