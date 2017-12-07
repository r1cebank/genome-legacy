const Genome = require('./genome');

const genome = new Genome();

const gene = genome.getGene(12);

console.log(gene);
gene.mutate();
console.log(gene);
