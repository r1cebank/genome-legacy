const _ = require('lodash');

class Gene {
    /**
     * To create a gene from a generated random string
     * @param {string} gene
     */
    constructor (gene) {
        if (gene.length !== 8) {
            throw new Error(`Expected gene size of 8, but got ${gene.length}`);
        }
        const splitted = gene.match(/.{1,2}/g);
        this.A = splitted[0]; // Data value
        this.B = splitted[1]; // Data value
        this.C = splitted[2]; // Data value
        this.I = splitted[3]; // Influence value
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
         */
        const mutateType = _.random(0, 3);
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
            default:
        }
    }
}

module.exports = Gene;
