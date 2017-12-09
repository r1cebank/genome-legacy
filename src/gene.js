const _ = require('lodash');
const crypto = require('crypto');
const fastLevenshtein = require('fast-levenshtein');

class Gene {
    /**
     * To create a gene from a generated random string
     * @param {string} gene
     */
    constructor (gene) {
        if (gene.length !== 8) {
            throw new Error(`Expected gene size of 8, but got ${gene.length}`);
        }
        if (isNaN(parseInt(gene, 16))) {
            throw new Error('Gene format incorrect, should be a hex string.');
        }
        const splitted = gene.match(/.{1,2}/g);
        this.A = splitted[0]; // Data value
        this.B = splitted[1]; // Data value
        this.C = splitted[2]; // Data value
        this.I = splitted[3]; // Influence value
        this.mutated = 0; // Time mutated
    }
    /**
     * Get value for A marker
     */
    rawA () {
        return parseInt(this.A, 16);
    }
    /**
     * Get value for B marker
     */
    rawB () {
        return parseInt(this.B, 16);
    }
    /**
     * Get value for C marker
     */
    rawC () {
        return parseInt(this.C, 16);
    }
    /**
     * Get value for influence marker
     */
    influence () {
        return parseInt(this.I, 16);
    }
    /**
     * Mutate this gene
     */
    mutate () {
        /**
         * Mutation type
         * 0 - delete (set to zero)
         * 1 - reversal (reverse)
         * 2 - duplication
         * 3 - shift
         * 4 - new value
         */
        const mutateType = _.random(0, 4);
        const affectedMarker = _.sample([ 'A', 'B', 'C', 'I' ]);
        const affectedMarkers = _.sampleSize([ 'A', 'B', 'C', 'I' ], 2);

        switch (mutateType) {
            case 0:
                this[affectedMarker] = '00';
                break;
            case 1:
                this[affectedMarker] = this[affectedMarker].split('').reverse().join('');
                break;
            case 2:
                this[affectedMarkers[0]] = this[affectedMarkers[1]];
                break;
            case 3: {
                const markers = [ this.A, this.B, this.C, this.I ];
                const shiftedMarkers = _.sampleSize(markers, 4);
                this.A = shiftedMarkers[0];
                this.B = shiftedMarkers[1];
                this.C = shiftedMarkers[2];
                this.I = shiftedMarkers[3];
                break;
            }
            case 4:
                this[affectedMarker] = crypto.randomBytes(1).toString('hex');
                break;
            default:
        }
        this.mutated++;
    }
    /**
     * Convert to string representation, include mutation counter
     * @returns {string}
     */
    toString () {
        return `${this.A}${this.B}${this.C}${this.I}-${this.mutated}`;
    }
    /**
     * Convert to string representation, without mutation counter
     * @returns {string}
     */
    getStrGene () {
        return `${this.A}${this.B}${this.C}${this.I}`;
    }
    /**
     * Compare this gene with another gene for similarity
     * @param {Gene} geneL
     * @param {Gene} geneR
     * @returns {boolean}
     */
    static compare (geneL, geneR) {
        const distance = fastLevenshtein.get(geneL.getStrGene(), geneR.getStrGene());

        // Allow one marker to be different
        if (distance <= 2) {
            return true;
        }
        return false;
    }
}

module.exports = Gene;
