<template>
  <div>
    <PageTitle title="Profile" sub-title="Manage your account" />
    <section class="section">
      {{ user }}
    </section>
    <section class="section">
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <!-- username -->
          <ValidationProvider v-slot="{ errors }" rules="min:8|max:30|required">
            <b-field
              label="Username"
              :type="{
                'is-danger': errors.length || usernameErrorMesssage,
                'is-success': !errors.length && !usernameErrorMesssage,
              }"
              :message="errors[0] || usernameErrorMesssage"
            >
              <b-input
                v-model="user.username"
                maxlength="30"
                @input="usernameErrorMesssage = ''"
              ></b-input>
            </b-field>
          </ValidationProvider>

          <!-- Email field -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="email|min:8|max:30|required"
          >
            <b-field
              label="Email"
              :type="{
                'is-danger': errors.length || emailErrorMessage,
                'is-success': !errors.length && !emailErrorMessage,
              }"
              :message="errors[0] || emailErrorMessage"
            >
              <b-input
                v-model="user.email"
                type="email"
                maxlength="30"
                @input="emailErrorMessage = ''"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- Phone field -->
          <ValidationProvider v-slot="{ errors }" rules="min:2|max:30">
            <b-field
              label="Phone"
              :type="{
                'is-danger': errors.length || phoneErrorMessage,
                'is-success': !errors.length && !phoneErrorMessage,
              }"
              :message="errors[0] || phoneErrorMessage"
            >
              <b-input
                v-model="user.phone"
                maxlength="30"
                @input="phoneErrorMessage = ''"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- FirstName field -->
          <ValidationProvider v-slot="{ errors }" rules="min:2|max:30">
            <b-field
              label="First Name"
              :type="{
                'is-danger': errors.length || firstNameErrorMessage,
                'is-success': !errors.length && !phoneErrorMessage,
              }"
              :message="errors[0] || firstNameErrorMessage"
            >
              <b-input
                v-model="user.firstName"
                maxlength="30"
                @input="firstNameErrorMessage = ''"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- LastName field -->
          <ValidationProvider v-slot="{ errors }" rules="min:2|max:30">
            <b-field
              label="Last Name"
              :type="{
                'is-danger': errors.length || lastNameErrorMessage,
                'is-success': !errors.length && !lastNameErrorMessage,
              }"
              :message="errors[0] || lastNameErrorMessage"
            >
              <b-input
                v-model="user.lastName"
                maxlength="30"
                @input="lastNameErrorMessage = ''"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- birthDate field -->
          <div id="birthdate-container">
            <ValidationProvider v-slot="{ errors }">
              <b-field
                label="Birthdate"
                :type="{
                  'is-danger': errors.length || birthDateErrorMessage,
                  'is-success': !errors.length && !birthDateErrorMessage,
                }"
                :message="errors[0] || birthDateErrorMessage"
              >
                <b-datepicker
                  v-model="user.birthDate"
                  :min-date="getDate100YearsAgo()"
                  :max-date="getDate10YeardAgo()"
                  :years-range="[-100, 100]"
                  @input="birthDateErrorMessage = ''"
                ></b-datepicker>
              </b-field>
            </ValidationProvider>
          </div>

          <!-- height -->
          <div id="height-container">
            <ValidationProvider
              v-slot="{ errors }"
              rules="minValue:50|maxValue:250"
            >
              <b-field
                label="Height (cm)"
                :type="{
                  'is-danger': errors.length || heightErrorMesssage,
                  'is-success': !errors.length && !heightErrorMesssage,
                }"
                :message="errors[0] || heightErrorMesssage"
              >
                <b-numberinput
                  v-model="user.height"
                  @input="heightErrorMesssage = ''"
                ></b-numberinput>
              </b-field>
            </ValidationProvider>
          </div>

          <!-- weight -->
          <div id="weight-container">
            <ValidationProvider
              v-slot="{ errors }"
              rules="minValue:40|maxValue:150"
            >
              <b-field
                label="Weight (kg)"
                :type="{
                  'is-danger': errors[0] || weightErrorMesssage,
                  'is-success': !errors.length && !weightErrorMesssage,
                }"
                :message="errors[0] || weightErrorMesssage"
              >
                <b-numberinput
                  v-model="user.weight"
                  @input="weightErrorMesssage = ''"
                ></b-numberinput>
              </b-field>
            </ValidationProvider>
          </div>

          <!-- Update button -->
          <div id="update-container" class="buttons">
            <b-button
              tag="input"
              value="Update"
              expanded
              :type="{
                'is-danger': invalid,
                'is-success': !invalid,
              }"
              :disabled="invalid"
              :loading="loading"
              @click="update"
            />
          </div>
        </form>
      </ValidationObserver>
    </section>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import axios from 'axios'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  async asyncData(context) {
    const token = context.app.$auth.getToken('local')
    axios.defaults.headers.common = { Authorization: `${token}` }
    const { data } = await axios.get(`http://localhost:1337/users/me`)
    // set default user.player datas
    if (data.birthDate !== null) {
      // used to make the date picker working
      data.birthDate = new Date(data.birthDate)
    }
    return {
      user: data,
    }
  },
  data() {
    return {
      emailErrorMessage: '',
      usernameErrorMesssage: '',
      firstNameErrorMessage: '',
      lastNameErrorMessage: '',
      birthDateErrorMessage: '',
      heightErrorMesssage: '',
      weightErrorMesssage: '',
      phoneErrorMessage: '',
      errorMessage: '',
      loading: false,
      user: Object,
    }
  },
  methods: {
    async update() {
      console.log(this.$axios.defaults.headers.common.Authorization)
      this.loading = true
      try {
        const response = await this.$axios.put(
          '/users/' + this.user.id,
          this.user
        )
        console.log(JSON.stringify(response))
      } catch (error) {
        if (error.response.status === 400) {
          switch (this.getMessagefromError(error).id) {
            case 'Auth.form.error.username.taken':
              this.usernameErrorMesssage = this.getMessagefromError(
                error
              ).message
              break
            case 'Auth.form.error.email.taken':
              this.emailErrorMessage = this.getMessagefromError(error).message
              break
          }
        } else {
          this.errorMesssage = 'unknow registration problem :c'
        }
      }
      this.loading = false
    },
    getDate10YeardAgo() {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 10)
      return date
    },
    getDate100YearsAgo() {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 100)
      return date
    },
  },
}
</script>

<style scoped>
#update-container {
  margin-top: 2em;
}
#birthdate-container {
  margin-bottom: 1em;
}
#weight-container {
  margin-top: 1em;
}
</style>
