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
}

export class Country {
  constructor(countryName, totalPopulation, infectedPopulation, currentPopulation, growthRate, cureRate, virus = new Virus('none', 0,0,0)){
    this.countryName = countryName;
    this.totalPopulation = totalPopulation;
    this.infectedPopulation = totalPopulation;
    this.currentPopulation = currentPopulation;
    this.growthRate = growthRate;
    this.cureRate = cureRate;
    this.virus = virus;
  }
  totalPopIncrease(){
    this.totalPopulation *= 1.003;
    this.totalPopulation = Math.ceil(this.totalPopulation);
    return this.totalPopulation;
  }
  infect(virus){
    this.virus = virus;
  }
}

// parvo()
// this.virusName = Parvo;
// this.infectRate =
