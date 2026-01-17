import { createStore } from 'vuex';

export interface RootState {
  formData: Record<string, any>;
}

export default createStore<RootState>({
  state: {
    formData: {}
  },
  mutations: {
    UPDATE_FORM_DATA(state, payload: { formId: string; data: any }) {
      state.formData[payload.formId] = payload.data;
    },
    CLEAR_FORM_DATA(state, formId: string) {
      delete state.formData[formId];
    }
  },
  actions: {
    updateFormData({ commit }, payload: { formId: string; data: any }) {
      commit('UPDATE_FORM_DATA', payload);
    },
    clearFormData({ commit }, formId: string) {
      commit('CLEAR_FORM_DATA', formId);
    }
  },
  getters: {
    getFormData: (state) => (formId: string) => {
      return state.formData[formId] || {};
    }
  }
});

