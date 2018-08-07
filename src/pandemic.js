export class Virus {
  constructor(virusName, infectRate, deathRate, travelRate, mutateCount = 0){
    this.virusName = virusName;
    this.infectRate = infectRate;
    this.deathRate = deathRate;
    this.travelRate = travelRate;
    this.mutateCount = mutateCount;
  }
  mutate(infectChange, deathChange, travelChange){
    this.infectRate += infectChange;
    this.deathRate += deathChange;
    this.travelRate += travelChange;
    this.mutateCount += 1;
  }
  getInfectRate(){
    return this.infectRate;
  }
  getDeathRate(){
    return this.deathRate;
  }
  getTravelRate(){
    return this.travelRate;
  }
}

export class Country {
  constructor(countryName, totalPopulation, infectedPopulation, deathPopulation, growthRate, cureRate, position = [], virus = new Virus('none', 0,0,0)){
    this.countryName = countryName;
    this.totalPopulation = totalPopulation;
    this.infectedPopulation = infectedPopulation;
    this.deathPopulation = deathPopulation;
    this.growthRate = growthRate;
    this.cureRate = cureRate;
    this.position = position;
    this.virus = virus;
  }
  countryTick(){
    const gameInterval = setInterval(() => {
      this.totalPopIncrease();
      if(this.infectedPopulation > 0){
        this.infectedPopChange();
        this.killPeople();
      }
      if(this.totalPopulation === 0){
        clearInterval(gameInterval);
      }
    }, 1000);
  }

  static createMap(countries){
    let map = [];
    for(let i = 0; i < 3; i ++){
      let tempRow = [];
      for(let j = 0; j< 3; j ++){
        countries[j + (3*i)].position = [i,j];
        tempRow.push(countries[j + (3*i)]);
      }
    map.push(tempRow);
    }
    return map;
  }
  infectNeighbor(){
    let neighbor = [[this.position[0] - 1, this.position[1]], [this.position[0] + 1, this.position[1]], [this.position[0], this.position[1] - 1], [this.position[0], this.position[1] + 1]];
    let legalNeighbor = [];
    for(let k = 0; k < 4; k++){
      if(neighbor[k][0] >= 0 && neighbor[k][0] < 3 && neighbor[k][1] >= 0 && neighbor[k][1] < 3){
        legalNeighbor.push(neighbor[k]);
      }
    }
    return legalNeighbor;

  }
  infectedPopChange(){
    this.infectedPopulation *= this.virus.getInfectRate();
    this.infectedPopulation = Math.ceil(this.infectedPopulation);
  }
  totalPopIncrease(){
    this.totalPopulation *= this.growthRate;
    this.totalPopulation = Math.ceil(this.totalPopulation);
    return this.totalPopulation;
  }
  infect(virus){
    this.virus = virus;
  }
  killPeople(){
    let dead = this.infectedPopulation * this.virus.getDeathRate();
    dead = Math.ceil(dead);
    this.deathPopulation += dead;
    this.totalPopulation = this.totalPopulation - dead;
  }
  curePeople(){
    const cureInterval = setInterval(() => {
      this.infectedPopulation -= 500;
    }, 20000);
  }
}

// parvo()
// this.virusName = Parvo;
// this.infectRate =
