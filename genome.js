const _ = require('lodash');
const crypto = require('crypto');

const Gene = require('./gene');

const GENOME_SIZE = 4; // Number of genes we are generating
const MUTATE_RATE = 0.00001; // Rate of mutation occur

class Genome {
    /**
     * Create a new genome
     */
    constructor (genePool, genes) {
        if (genePool && genes) {
            this.genePool = genePool;
            this.genes = genes;
        } else {
            // Times 4 because each of our gene is 4 bytes, times 2 to create a pool to choose from
            this.genePool = crypto
                .randomBytes(GENOME_SIZE * 8)
                .toString('hex')
                .match(/.{1,8}/g)
                .map((gene) => {
                    return new Gene(gene);
                });
            this.genes = _.sampleSize(this.genePool, GENOME_SIZE);
        }
    }
    /**
     * get #th gene, gene starts at 0
     * @param {number} geneNumber
     */
    getGene (geneNumber) {
        if (geneNumber >= this.genes.length) {
            throw new Error('Gene does not exist');
        }
        return this.genes[geneNumber];
    }
    /**
     * Merge genome to a new set of genes
     * @param {Genome} genome
     */
    mergeGenome (genome) {
        if (genome.genes.length !== this.genes.length) {
            throw new Error('Genome size mismatch');
        }
        const newGenePool = genome.genes.concat(this.genes);
        const mutationP = parseInt(1 / MUTATE_RATE, 10);
        const newGenes = _.range(this.genes.length).map((i) => {
            if (_.random(0, 1)) {
                if (_.random(0, mutationP) === mutationP) {
                    genome.genes[i].mutate();
                }
                return genome.genes[i];
            }
            if (_.random(0, mutationP) === mutationP) {
                this.genes[i].mutate();
            }
            return this.genes[i];
        });
        return new Genome(newGenePool, newGenes);
    }
}

module.exports = Genome;
