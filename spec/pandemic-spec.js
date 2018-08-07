import { Virus } from  '../src/pandemic';
import { Country } from  '../src/pandemic';

describe('country', function(){
  beforeEach(function() {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });
  it('should return country name', function(){
    let newCountry = new Country('Derek', 1000, 50, 3,3,3);
    expect(newCountry.countryName).toEqual('Derek');
  });

  it('should return total population increase', function(){
    let newCountry = new Country('brazil', 1000, 50, 20, 1.003, 3);
    expect(newCountry.totalPopIncrease()).toEqual(1003);
  });
  it('should save a virus to a country', function(){
    let newCountry = new Country('brazil', 1000, 50, 3, 3, 3);
    let newVirus = new Virus('league', 5, 3, 3);
    newCountry.infect(newVirus);
    expect(newCountry.virus).toEqual(newVirus);
  });
  it('should update the infected population', function(){
    let newCountry = new Country('brazil', 1000, 50, 3, 3, 3);
    let newVirus = new Virus('league', 1.005, 3, 3);
    newCountry.infect(newVirus);
    newCountry.infectedPopChange();
    expect(newCountry.infectedPopulation).toEqual(51);
  });
  it('should update the infected population', function(){
    let newCountry = new Country('brazil', 1000, 52, 3, 3, 3);
    let newVirus = new Virus('league', 1.005, 0.03, 3);
    newCountry.infect(newVirus);
    newCountry.killPeople();
    expect(newCountry.totalPopulation).toEqual(998);
  });
  it('should create the map', function(){
    let country1 = new Country('brazil', 1000, 502, 3, 3, 3);
    let country2 = new Country('colombia', 1000, 502, 3, 3, 3);
    let country3 = new Country('peru', 1000, 502, 3, 3, 3);
    let country4 = new Country('venezuela', 1000, 502, 3, 3, 3);
    let country5 = new Country('guyana', 1000, 502, 3, 3, 3);
    let country6 = new Country('peru', 1000, 502, 3, 3, 3);
    let country7 = new Country('ecuador', 1000, 502, 3, 3, 3);
    let country8 = new Country('bolivia', 1000, 502, 3, 3, 3);
    let country9 = new Country('paraguay', 1000, 502, 3, 3, 3);
    let theMap = [country1, country2, country3, country4, country5, country6, country7, country8, country9];
    let expectedMap = [[country1, country2, country3], [country4, country5, country6], [country7, country8, country9]];
    let neighborCountries = [[0,1],[2,1],[1,0],[1,2]];
    expect(Country.createMap(theMap)).toEqual(expectedMap);
    expect(country9.position).toEqual([2,2]);
    expect(country5.infectNeighbor()).toEqual(neighborCountries);
  });
  it('should update population, infected population, and current population', function(){
    let country3 = new Country('peru', 1000, 502, 1, 1.003, 3);
    let newVirus = new Virus('league', 1.03, .003, 3);
    country3.infect(newVirus);
    country3.countryTick();
    jasmine.clock().tick(3001);
    expect(country3.totalPopulation).toEqual(1005);
    expect(country3.infectedPopulation).toEqual(551);
    expect(country3.deathPopulation).toEqual(7);
  });
  it('should cure after some time', function(){
    let country3 = new Country('peru', 10001, 5012, 1, 1.003, 3);
    country3.curePeople();
    jasmine.clock().tick(60001);
    expect(country3.infectedPopulation).toEqual(3512);
  });
});
