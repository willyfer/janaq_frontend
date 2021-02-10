<template>
  <div class="">
    <div
      class="col col-4 card justify-cIngrese mx-auto p-2 px-5"
      v-if="formIsVisible"
    >
      <h3 class="mt-4">Registrar Usuario</h3>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-name"
          label="Nombre y Apellido"
          label-for="input-name"
          class="text-left"
        >
          <b-form-input
            id="input-name"
            v-model="form.name"
            placeholder="Ingrese name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-email"
          label="Correo Electrónico"
          label-for="input-email"
          class="text-left"
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            placeholder="Ingrese email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-tipo_doc"
          label="tipo documento:"
          label-for="input-tipo_doc"
          class="text-left"
        >
          <b-form-select
            id="input-tipo_doc"
            v-model="form.tipo_doc"
            :options="tipo_docs"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-doc"
          label="Dcoumento de identidad"
          label-for="input-doc"
          class="text-left"
        >
          <b-form-input
            id="input-doc"
            v-model="form.doc"
            type="number"
            placeholder="Ingrese documento"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-pass"
          label="Contraseña"
          label-for="input-pass"
          class="text-left"
        >
          <b-form-input
            id="input-pass"
            v-model="form.password"
            type="password"
            placeholder="Ingrese contraseña"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-fech"
          label="Fecha de nacimiento"
          label-for="input-fech"
          class="text-left"
        >
          <b-form-input
            id="input-fech"
            v-model="form.fech_nac"
            type="date"
            placeholder="Ingrese fecha"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-dir"
          label="Dirección"
          label-for="input-dir"
          class="text-left"
        >
          <b-form-input
            id="input-dir"
            v-model="form.dir"
            type="text"
            placeholder="Ingrese email"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">REGISTRAR</b-button>
        <br />
        <br />
        <router-link to="/login" class=" ">Iniciar Sesion</router-link>
      </b-form>
    </div>
    <div v-else>
      <div class="justify-center align-items-center mx-auto p-5">
        <b-spinner type="grow" label="Cargando..." class="m-5"></b-spinner>
        <h5>Cargando...</h5>
      </div>
    </div>

    <b-alert v-model="showAlert">
      {{ alertMessage }}
    </b-alert>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Register",
  components: {},
  data() {
    return {
      formIsVisible: true,
      alertMessage: "",
      showAlert: false,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      form: {
        email: "",
        name: "",
        doc: "",
        dir: "",
        fech_nac: "",
        password: "",
        tipo_doc: null,
      },
      tipo_docs: [
        { text: "Seleccionar", value: null },
        "dni",
        "carnet extranjeria",
      ],
      show: true,
    };
  },
  methods: {
    clearData() {
      (this.form.email = ""),
        (this.form.name = ""),
        (this.form.doc = ""),
        (this.form.dir = ""),
        (this.form.fech_nac = ""),
        (this.form.password = "");
      this.form.tipo_doc = "";
    },
    pushLogin() {
      var self = this;
      setInterval(function () {
        self.$router.push({ path: "/login" });
      }, 1500);
    },
    makeToast(
      append = false,
      title = "title",
      sms = "This is toast number",
      variant = "success"
    ) {
      this.$bvToast.toast(sms, {
        title: title,
        autoHideDelay: 5000,
        appendToast: append,
        variant: variant,
        solid: true,
      });
    },
    fechtData() {
      this.formIsVisible = false;
      const formData = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        tipo_doc: this.form.tipo_doc,
        doc: this.form.doc.toString(),
        dir: this.form.dir,
        fech_nac: this.form.fech_nac,
      };

      console.log("fomr data", JSON.stringify(formData));
      var self = this;
      fetch("http://127.0.0.1:8000/api/auth/signup", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(function (response) {
          if (response.status !== 201) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          // Examine the text in the response
          response.json().then(function (data) {
            console.log("llegada", data);
            self.makeToast(
              false,
              "Mensaje",
              "Usuario registrado correctamente!",
              "success"
            );
            self.clearData();
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        })
        .finally(() => {
          self.formIsVisible = true;
        });
    },

    onSubmit(event) {
      event.preventDefault();
      this.fechtData();
    },
    fechtlogin() {},
    onReset(event) {
      event.preventDefault();
      // Reset our form values

      //   this.show = false;
      //   this.$nextTick(() => {
      //     this.show = true;
      //   });
    },
  },
};
</script>