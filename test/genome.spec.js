/* global test expect */

const gene = require('../src/gene');
const genome = require('../src/genome');


test('should correct generate genome', () => {
    const newGenome = new genome(undefined, 12);
    expect(newGenome.genes.length).toEqual(12);
});

test('should correct generate genome from genes', () => {
    const newGenome = new genome([new gene('01020304')]);
    expect(newGenome.genes.length).toEqual(1);
});

test('should throw when getting gene out of bound', () => {
    expect(() => {
        const newGenome = new genome();
        newGenome.getGene(19);
    }).toThrowError('Gene does not exist');
});

test('should get correct gene', () => {
    const newGenome = new genome();
    expect(newGenome.getGene(1)).toBeInstanceOf(gene);
});

test('should not merge when size mismatch', () => {
    const newGenome = new genome(undefined, 12);
    const newGenome2 = new genome(undefined, 16);
    expect(() => {
        newGenome.mergeGenome(newGenome2);
    }).toThrowError('Genome size mismatch');
});

test('should correct merge gene', () => {
    const newGenome = new genome(undefined, 16);
    const newGenome2 = new genome(undefined, 16);
    const mergedGenome = newGenome.mergeGenome(newGenome2);
    expect(mergedGenome.genes.length).toEqual(16);
});

test('should find gene', () => {
    const newGenome = new genome(undefined, 16);
    const gene0 = newGenome.getGene(0);
    expect(newGenome.existGene(gene0)).toBeTruthy();
});

test('should not find gene if not part of genome', () => {
    const newGenome = new genome(undefined, 16);
    const gene0 = new gene('01020304');
    expect(newGenome.existGene(gene0)).not.toBeTruthy();
});

test('should correctly identify parent', () => {
    const newGenome = new genome(undefined, 256);
    const newGenome2 = new genome(undefined, 256);
    const mergedGenome = newGenome.mergeGenome(newGenome2);
    expect(newGenome.isParent(mergedGenome)).toBeTruthy();
    expect(newGenome2.isParent(mergedGenome)).toBeTruthy();
});

test('should correctly identify stranger', () => {
    const newGenome = new genome(undefined, 256);
    const newGenome2 = new genome(undefined, 256);
    const newGenome3 = new genome(undefined, 256);
    const mergedGenome = newGenome.mergeGenome(newGenome2);
    expect(newGenome3.isParent(mergedGenome)).not.toBeTruthy();
});
