import { defineComponent, onMounted } from "vue";

export defauult defineComponent({
  setup: () => {
    console.log( 'object' )

    onMounted( () => {
      console.log( 'mounted' )
    } )
  }
})