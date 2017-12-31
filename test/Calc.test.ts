import { should } from 'chai';
import { Calc } from '../src/Calc';
should();

describe('Calc test suite', function() {
    let calc = new Calc();
    it('Can add', function() {
        let result = calc.add(5,5);
        result.should.equals(10, `Should return: 10, but returned: ${result}`);
    });
    it('Can subtract', function() {
        let result = calc.subtract(20,10);
        result.should.equals(10, `Should return: 10, but returned: ${result}`);
    });
});