
import { SP, getUID } from "./common.mjs";

const PDF_OBJECT = Symbol.for('PDFObject');

function PDFObjectFactory(primitive) {

    return class PDFObject extends primitive {

        #name = null;
        #objectNumber = 0;
        #generationNumber = 0;

        get [PDF_OBJECT]() {
            return true;
        }

        constructor(...args) {

            super(...args);

            this.#name = getUID(this.constructor.name);

        }

        getObjectHeader() {

            return this.#objectNumber + SP +
                   this.#generationNumber + SP + 'obj';

        }

        getObjectName() {

            return this.#name;

        }

        getObjectR() {

            return this.#objectNumber + SP +
                   this.#generationNumber + SP + 'R';

        }

        setObjectR(objectNumber, generationNumber = 0) {

            this.#objectNumber = objectNumber;
            this.#generationNumber = generationNumber;

        }

    };

}

const PDFObject = new Proxy(PDFObjectFactory, {

    apply(target, thisArg, args) {

        return target.apply(thisArg, args);

    },

    get(target, property, receiver) {

        if (property === Symbol.hasInstance) {

            return (instance) => {
                return instance?.[PDF_OBJECT] === true;
            };

        }

        return Reflect.get(target, property, receiver);

    }

});

export default PDFObject;
