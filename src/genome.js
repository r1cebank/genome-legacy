const _ = require('lodash');
const crypto = require('crypto');

const Gene = require('./gene');

const GENOME_SIZE = 16; // Number of genes we are generating
const MUTATION_RATE = 0.01; // Rate of mutation occur

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
                .match(/.{1,8}/g);
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
        return new Gene(this.genes[geneNumber]);
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
        const mutationP = parseInt(1 / MUTATION_RATE, 10);
        const newGenes = _.range(this.genes.length).map((i) => {
            if (_.random(0, 1)) {
                if (_.random(0, mutationP) === mutationP) {
                    const gene = new Gene(genome.genes[i]);
                    gene.mutate();
                    return gene.getStrGene();
                }
                return genome.genes[i];
            }
            if (_.random(0, mutationP) === mutationP) {
                const gene = new Gene(this.genes[i]);
                gene.mutate();
                return gene.getStrGene();
            }
            return this.genes[i];
        });
        return new Genome(newGenePool, newGenes);
    }
    /**
     * If the genome exist a gene or a similar mutation of that gene
     * @param {string} gene
     */
    existGene (gene) {
        return !!this.genes.find((g) => {
            return Gene.compare(new Gene(g), new Gene(gene));
        });
    }
    /**
     * Can this genome produced a genome
     * @param {Genome} genome
     */
    isParent (genome) {
        /**
         * How can we tell if current genome is the parent of the supplied genome?
         * 1. Check genepool, should include half of the current genome
         */
        const genePoolPortion = genome.genePool.reduce((acc, gene) => {
            if (this.genes.includes(gene)) {
                return acc + 1;
            }
            return acc;
        }, 0) / genome.genePool.length;
        if (genePoolPortion === 0.5) { return true; }
        return false;
    }
}

module.exports = Genome;
