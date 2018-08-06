import { Virus } from  '../src/pandemic';
import { Country } from  '../src/pandemic';

describe('country', function(){
  it('should return country name', function(){
    let newCountry = new Country('Derek', 1000, 50, 3,3,3);
    expect(newCountry.countryName).toEqual('Derek');
  });

  it('should return virus infect rate', function(){
    let newCountry = new Country('brazil', 1000, 50, 3, 3, 3);
    expect(newCountry.totalPopIncrease()).toEqual(1003);
  });
  it('should save a virus to a country', function(){
    let newCountry = new Country('brazil', 1000, 50, 3, 3, 3);
    let newVirus = new Virus('league', 5, 3, 3);
    newCountry.infect(newVirus);
    expect(newCountry.virus).toEqual(newVirus);
  });

});
