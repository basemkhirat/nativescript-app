import * as imagepicker from "nativescript-imagepicker";
const ImageSourceModule = require("tns-core-modules/image-source");

export default class ImagePicker {

    options = {
        mode: "single"
    }

    constructor(options) {
        this.options = options || this.options;
    }

    create(callback) {

        let context = imagepicker.create(this.options)

        context.authorize()

            .then(function () {
                return context.present();
            })

            .then((selection) => {
                callback(null, this.options.mode == "single" ? selection[0] : selection);
            })

            .catch(function (error) {
                callback(error);
            });
    }


    getData(selection, callback) {

        ImageSourceModule.fromAsset(selection).then(image => {

            let base64 = image.toBase64String('jpeg');

            callback(null, base64);

        }).catch(function (error) {
            callback(error);
        });

    }
}
