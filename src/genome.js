const _ = require('lodash');
const crypto = require('crypto');

const Gene = require('./gene');

const GENOME_SIZE = 16; // Number of genes we are generating
const MUTATION_RATE = 0.1; // Rate of mutation occur
const PARENT_ACCEPT = 0.4; // Percentage of same genes to be considered as parent

class Genome {
    /**
     * Create a new genome
     */
    constructor (genes, size) {
        this.mutations = [];
        if (genes) {
            this.genes = genes;
        } else {
            // Times 4 because each of our gene is 4 bytes, times 2 to create a pool to choose from
            this.genes = _.sampleSize(crypto
                .randomBytes((size || GENOME_SIZE) * 8)
                .toString('hex')
                .match(/.{1,8}/g), size || GENOME_SIZE);
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
        const mutationP = parseInt(1 / MUTATION_RATE, 10);
        const mutations = [];
        const newGenes = _.range(this.genes.length).map((i) => {
            if (_.random(0, 1)) {
                if (_.random(0, mutationP) === mutationP) {
                    const gene = new Gene(genome.genes[i]);
                    gene.mutate();
                    mutations.push(gene.getStrGene());
                    return gene.getStrGene();
                }
                return genome.genes[i];
            }
            if (_.random(0, mutationP) === mutationP) {
                const gene = new Gene(this.genes[i]);
                gene.mutate();
                mutations.push(gene.toString());
                return gene.getStrGene();
            }
            return this.genes[i];
        });
        const newGenome =  new Genome(newGenes);
        newGenome.mutations = mutations;
        return newGenome;
    }
    /**
     * If the genome exist a gene or a similar mutation of that gene
     * @param {string} gene
     */
    existGene (gene) {
        return !!this.genes.find((g) => {
            return Gene.compare(new Gene(g), gene);
        });
    }
    /**
     * Can this genome produced a genome
     * @param {Genome} genome
     */
    isParent (genome) {
        const genePortion = genome.genes.reduce((acc, gene) => {
            if (this.existGene(new Gene(gene))) {
                return acc + 1;
            }
            return acc;
        }, 0) / genome.genes.length;
        if (genePortion >= PARENT_ACCEPT) { return true; }
        return false;
    }
}

module.exports = Genome;
