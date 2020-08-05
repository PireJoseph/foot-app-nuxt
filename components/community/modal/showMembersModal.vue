<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Members
      </p>
    </header>
    <div class="modal-card-body">
      <div class="table-container">
        <b-table
          v-if="group"
          :data="group.members"
          :columns="memberTableColumns"
          :narrowed="true"
          :default-sort="['team', 'username']"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    group: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      memberTableColumns: [
        {
          field: 'username',
          label: 'user name',
        },
        {
          field: 'firstName',
          label: 'first name',
        },
        {
          field: 'lastName',
          label: 'last name',
        },
      ],
    }
  },
}
</script>
