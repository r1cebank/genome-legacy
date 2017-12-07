const _ = require('lodash');
const crypto = require('crypto');

const Gene = require('./gene');

const GENOME_SIZE = 16; // Number of genes we are generating

class Genome {
    constructor () {
        // Times 4 because each of our gene is 4 bytes, times 2 to create a pool to choose from
        this.genePool = crypto.randomBytes(GENOME_SIZE * 8).toString('hex').match(/.{1,8}/g);
        this.genes = _.sampleSize(this.genePool, GENOME_SIZE);
    }
    getGene (geneNumber) {
        if (geneNumber >= this.genes.length) {
            throw new Error('Gene does not exist');
        }
        return new Gene(this.genes[geneNumber]);
    }
}

module.exports = Genome;
