const Genome = require('./src/genome');
const Gene = require('./src/gene');

const genome = new Genome();
const genome2 = new Genome();
const genome3 = new Genome();

// const gene = genome.getGene(1);

// console.log(gene);
// gene.mutate();
// console.log(gene);

// console.log(gene.rawA());

// console.log(genome.genes);
// console.log(genome2.genes);



// const gene1 = new Gene('0fab5011');
// const gene2 = new Gene('0fab5011');
// gene2.mutate();


// console.log(Gene.compare(gene1, gene2));

const child = genome.mergeGenome(genome2);

console.log(child);

// const num = 100;

// for (let i = 0; i < num; i++) {
//     const genome = new Genome();
//     const genome2 = new Genome();
//     const child = genome.mergeGenome(genome2);
//     const percent = genome.isParent(child);
//     console.log(percent);
// }

// console.log(genome.isParent(child));
// console.log(genome2.isParent(child));
// console.log(genome3.isParent(child));

// console.log(JSON.stringify(genome));

// console.log(genome.existGene(genome.genes[1]));
