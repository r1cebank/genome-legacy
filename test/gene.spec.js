/* global test expect */
const gene = require('../src/gene');

test('should only allow 8 char input', () => {
    expect(() => {
        const newGene = new gene('xx');
    }).toThrowError('Expected gene size of 8, but got 2');
});

test('should only allow hex input', () => {
    expect(() => {
        const newGene = new gene('xxxxxxxx');
    }).toThrowError('Gene format incorrect, should be a hex string.');
});

test('should return correct A marker', () => {
    const newGene = new gene('01020304');
    expect(newGene.rawA()).toEqual(1);
});

test('should return correct B marker', () => {
    const newGene = new gene('01020304');
    expect(newGene.rawB()).toEqual(2);
});

test('should return correct C marker', () => {
    const newGene = new gene('01020304');
    expect(newGene.rawC()).toEqual(3);
});

test('should return correct I marker', () => {
    const newGene = new gene('01020304');
    expect(newGene.influence()).toEqual(4);
});

test('should mutate zero marker', () => {
    const newGene = new gene('01020304');
    newGene.mutate(1, 'I');
    expect(newGene.influence()).toEqual(0);
});

test('should not mutate if type incorrect', () => {
    const newGene = new gene('01020304');
    const originalGene = newGene.toString();
    newGene.mutate(10, 'I', [ 'A', 'B' ]);
    expect(newGene.toString()).toEqual(originalGene);
});

test('should mutate reverse marker', () => {
    const newGene = new gene('01020304');
    newGene.mutate(2, 'I');
    expect(newGene.influence()).toEqual(64);
});

test('should mutate duplicate marker', () => {
    const newGene = new gene('01020304');
    newGene.mutate(3, 'I', [ 'A', 'B' ]);
    expect(newGene.rawA()).toEqual(2);
});

test('should mutate new marker', () => {
    const newGene = new gene('01020304');
    newGene.mutate(5, 'I');
    expect(newGene.rawA()).not.toEqual(4);
});

test('should correct convert to string', () => {
    const newGene = new gene('01020304');
    expect(newGene.toString()).toEqual('01020304-0');
});

test('should correct get only gene string', () => {
    const newGene = new gene('01020304');
    expect(newGene.getStrGene()).toEqual('01020304');
});

test('should correct compare gene string', () => {
    const newGene = new gene('01020304');
    const newGene2 = new gene('01020304');
    expect(gene.compare(newGene, newGene2)).toBeTruthy();
});

test('should correct compare mutated gene string', () => {
    const newGene = new gene('01020304');
    const newGene2 = new gene('01020304');
    newGene2.mutate(1, 'I');
    expect(gene.compare(newGene, newGene2)).toBeTruthy();
});

test('should return false when gene is different', () => {
    const newGene = new gene('01020304');
    const newGene2 = new gene('02030405');
    expect(gene.compare(newGene, newGene2)).toBeFalsy();
});

