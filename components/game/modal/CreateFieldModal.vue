<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Create new field
      </p>
    </header>
    <div class="modal-card-body">
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <!-- name -->
          <ValidationProvider v-slot="{ errors }" rules="min:8|max:30|required">
            <b-field
              label="Name"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-input
                v-model="field.name"
                name="name"
                maxlength="30"
              ></b-input>
            </b-field>
          </ValidationProvider>

          <!-- Number / Box -->
          <ValidationProvider v-slot="{ errors }" rules="min:1|max:30|required">
            <b-field
              label="Number / Box"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-input
                v-model="field.number"
                name="name"
                maxlength="30"
              ></b-input>
            </b-field>
          </ValidationProvider>

          <!-- Road -->
          <ValidationProvider v-slot="{ errors }" rules="min:8|max:30|required">
            <b-field
              label="Road"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-input
                v-model="field.road"
                name="name"
                maxlength="30"
              ></b-input>
            </b-field>
          </ValidationProvider>

          <!-- City -->
          <ValidationProvider v-slot="{ errors }" rules="min:3|max:30|required">
            <b-field
              label="City"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-input
                v-model="field.city"
                name="name"
                maxlength="30"
              ></b-input>
            </b-field>
          </ValidationProvider>

          <!-- Postcode -->
          <ValidationProvider v-slot="{ errors }" rules="min:4|max:6|required">
            <b-field
              label="Country"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-input
                v-model="field.postcode"
                name="name"
                maxlength="6"
              ></b-input>
            </b-field>
          </ValidationProvider>

          <!-- Create button -->
          <div class="buttons">
            <b-button
              tag="input"
              value="Create"
              expanded
              :type="{
                'is-danger': invalid,
                'is-success': !invalid,
              }"
              :disabled="invalid"
              :loading="loading"
              @click="createNewField"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      isActive: false,
      loading: false,
      field: {
        name: null,
        number: null,
        road: null,
        city: null,
        postcode: null,
      },
    }
  },
  methods: {
    async createNewField() {
      const { data } = await this.$axios.post('/fields', this.field)
      this.field = {
        name: null,
        number: null,
        road: null,
        city: null,
        postcode: null,
      }
      this.$buefy.toast.open({
        message: 'Field created successfully',
        type: 'is-success',
      })
      this.$emit('field-created', data)
    },
  },
}
</script>
