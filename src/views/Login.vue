<template>
  <div class="">
    <div
      class="col col-4 card justify-center mx-auto p-2 px-5"
      v-if="formIsVisible"
    >
      <h3 class="mt-4">Inicar Sesión</h3>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Correo Electronico"
          label-for="input-1"
          class="text-left"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Ingrese email"
            required
            :state="isEmailValid()"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback" v-if="isEmailValid">
            Ingrese un email válido
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Contraseña"
          label-for="input-2"
          class="text-left"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="Ingrese contraseña"
            required
            type="password"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">INGRESAR</b-button>
        <br />
        <br />
        <router-link to="/register" class=" ">Registrarse</router-link>
        <br />
        <br />
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
  name: "Login",
  components: {},
  data() {
    return {
      alertMessage: "",
      showAlert: false,
      formIsVisible: true,
      form: {
        email: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    isEmailValid() {
      let reg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      return this.form.email == ""
        ? null
        : reg.test(this.form.email)
        ? true
        : false;
    },
    saveToken(token) {
      localStorage.setItem("token", token);
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
    clearData() {
      (this.form.email = ""), (this.form.password = "");
    },
    pushhome() {
      var self = this;
      setInterval(function () {
        self.$router.push("/").catch(() => {});
      }, 1000);
    },
    fechtData() {
      this.formIsVisible = false;
      const formData = {
        email: this.form.email,
        password: this.form.password,
        remember_me: true,
      };

      console.log("fomr data", JSON.stringify(formData));
      var self = this;
      fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(formData),
      })
        .then(function (response) {
          if (response.status !== 200) {
            console.log("Algo anda mal. Status Code: " + response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function (data) {
            console.log("llegada", data);
            self.saveToken(data.access_token);
            self.clearData();
            self.pushhome();
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
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
<style>
body {
  font-size: 14px;
}
</style>