<template>
  <div>
    <div class="content">Create a new game</div>
    <div class="content">
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <!-- Start at -->
          <ValidationProvider v-slot="{ errors }">
            <b-field
              label="Start At"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-datepicker
                v-model="game.startAt"
                :min-date="getDateToday()"
                :max-date="getDateIn10Years()"
                :years-range="[-100, 100]"
              ></b-datepicker>
            </b-field>
          </ValidationProvider>

          <!-- Field -->
          <ValidationProvider v-slot="{ errors }">
            <b-field
              label="Field"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-select
                v-if="fields.length"
                v-model="game.field"
                placeholder="Select a field"
                expanded
              >
                <option
                  v-for="field in fields"
                  :key="field.id"
                  :value="field.id"
                >
                  {{ field.name }}
                </option>
              </b-select>
            </b-field>
          </ValidationProvider>

          <div class="buttons">
            <b-button
              tag="input"
              value="Add new field"
              expanded
              :disabled="invalid"
              :loading="loading"
              @click="OpenCreateFieldModal"
            />
          </div>

          <!-- max number of players -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="minValue:8|maxValue:32"
          >
            <b-field
              label="Max number of players"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-numberinput v-model="game.maxNumberOfPlayers"></b-numberinput>
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
              @click="createNewGroup"
            />
          </div>
        </form>
      </ValidationObserver>

      <b-modal
        :active.sync="isCreateFieldModalOpen"
        aria-role="dialog"
        :has-modal-card="true"
      >
        <CreateFieldModal @field-created="onFieldCreated" />
      </b-modal>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import CreateFieldModal from '~/components/game/modal/CreateFieldModal'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    CreateFieldModal,
  },
  data() {
    return {
      loading: false,
      fields: [],
      game: {
        startAt: null,
        field: null,
        players: [],
        maxNumberOfPlayers: 12,
        teamAMembers: [],
        teamBMembers: [],
        teamAGoals: 0,
        teamBGoals: 0,
      },
      startAtErrorMessage: '',
      fieldErrorMessage: '',
      // isCreateFieldModalOpen
      isCreateFieldModalOpen: false,
    }
  },
  async mounted() {
    const { data } = await this.$axios.get('fields')
    this.fields = data
  },
  methods: {
    getDateToday() {
      return new Date()
    },
    getDateIn10Years() {
      const date = new Date()
      date.setFullYear(date.getFullYear() + 10)
      return date
    },
    OpenCreateFieldModal() {
      this.isCreateFieldModalOpen = true
    },
    onFieldCreated(field) {
      this.fields = [...this.fields, field]
      this.isCreateFieldModalOpen = false
    },
    async createNewGroup() {
      await this.$axios.post('/games', this.game)
      this.game = {
        startAt: null,
        field: null,
        players: [],
        maxNumberOfPlayers: 12,
        teamAMembers: [],
        teamBMembers: [],
        teamAGoals: 0,
        teamBGoals: 0,
      }
      this.$buefy.toast.open({
        message: 'Game created successfully',
        type: 'is-success',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.buttons {
  margin-top: 1em;
}
</style>
