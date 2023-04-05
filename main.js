var JPSeguros = function () {
    const datos = [
        { id: "1", nombre: "Ford", modelos: [ { id:1, nombre:"Ka" }, {id:2, nombre:"Focus 3"}, {id:3, nombre:"Mondeo"}, {id:4 , nombre:"Fusion"}] },
        { id: "2", nombre: "Chevrolet", modelos: [{id:1, nombre:"Cruze"},{id:2, nombre:"Onix"} ,{id:3, nombre:"S10"} ,{id:4, nombre:"Tracker"}] },
        { id: "3", nombre: "Fiat", modelos: [{id:1, nombre:"Toro"},{id:2, nombre:"Bravo"}, {id:3, nombre:"Palio"}, {id:4, nombre:"Punto"}] }
    ];

    function inicio() {        
        loadMarcas();
        let btnCotizar = document.getElementById('cotizar');
        btnCotizar.addEventListener("click", function (e) {            
            e.preventDefault();
            if(formValid()){
                const formData = new FormData(document.getElementById('cotizar-seguro'));
                const formProps = Object.fromEntries(formData);            
                cotizar(formProps);
            }            
        });
    }

    function formValid(){
        let form = document.getElementById('cotizar-seguro');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return false;
        } else{
            return true;
        }
    }

    function loadMarcas() {
        let marca = document.getElementById('marca');
        marca.innerHTML = '';
        marca.append(new Option('-- Seleccione una marca', ''))

        marca.addEventListener("change", function (e) {
            let selected = e.target.value;
            loadModelos(selected);
        });

        datos.forEach((element) => {
            let option = new Option(element.nombre, element.id);
            marca.append(option);
        });
    }

    function loadModelos(marcaSeleccionada) {  
        let modelos = document.getElementById('modelo');
        modelos.innerHTML = '';
        modelos.append(new Option('-- Seleccione un modelo', ''))

        if (marcaSeleccionada.length > 0) {
            let marca = datos.filter(marca => marca.id == marcaSeleccionada);
            
            marca[0].modelos.forEach((element, key) => {
                let option = new Option( element.nombre, element.id);
                modelos.append(option);
            });
        }
    }

    function cotizar(props) {  
        const marca = datos.filter(marca => marca.id == props.marca)[0];
        const modelo = marca.modelos.filter(modelos => modelos.id == props.modelo)[0];
        let cantidad = 1;
        let importeBase = 4000;
        let modeloImporte = 0;

        if (marca.nombre == "Ford") {
            marcaImporte = 750;
        } else if (marca.nombre == "Chevrolet") {
            marcaImporte = 1300;
        } else {
            marcaImporte = 300;
        }

        if (marca.nombre == "Chevrolet" && modelo == "S10") {
            modeloImporte = 500;
        }

        if (props.anio >= 2022) {
            fechaImporte = 800;
        } else if (props.anio >= 2013 && props.anio >= 2021) {
            fechaImporte = 400;
        } else {
            fechaImporte = 100;
        }

        if (props.tipo === "basico") {
        cantidad = 1.3;
        } else {
            cantidad= 1.5;
        }          

        let total = (importeBase + marcaImporte + modeloImporte + fechaImporte) * cantidad;

        const resultado = `
        Impuesto por Base: $ ${importeBase} <br/>
        Impuesto por Modelo: $ ${modeloImporte} <br/>
        Impuesto por Marca: $ ${marcaImporte} <br/>
        Impuesto por Antiguedad: $ ${fechaImporte} <br/>
        Multiplicador por Tipo: ${cantidad} <br/>
        --------------------------------------------- <br/>
        Total: $ ${total}
        `;
        
        let resultadoContainer = document.getElementById('resultado');
        resultadoContainer.innerHTML = resultado;       
    }

    inicio();
}

var jpSeguros = new JPSeguros();