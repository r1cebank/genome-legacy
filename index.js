const Genome = require('./genome');

const genome = new Genome();
const genome2 = new Genome();

// const gene = genome.getGene(1);

// console.log(gene);
// gene.mutate();
// console.log(gene);

// console.log(gene.rawA());

console.log(genome.genes);
console.log(genome2.genes);


console.log(genome.mergeGenome(genome2).genes);
