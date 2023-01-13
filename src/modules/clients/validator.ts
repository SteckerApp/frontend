import {ref, type Ref,computed} from 'vue'
import { required, email, minLength, helpers, sameAs } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import {BrandFormType,WorkspaceTeamType,NewProjectFormType} from './types'


export function validateBrandForm() {
    
    const form:Ref<BrandFormType> = ref({
        name:'',
        industry:'',
        description:'',
        website:'',
        audience:'',
        colors:[],
        attachments:[],
      })

    const rules = computed(() => {
        return {
            name: { required },
            industry: { required },
            description: { required },
            website: { required }, 
            audience: { required },
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}

export function validateNewWorkspaceMember() {
    
    const form:Ref<WorkspaceTeamType> = ref({
        name:'',
        email:'',
        role:'',
      })

    const rules = computed(() => {
        return {
            name: { required },
            email: { required },
            role: { required },
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}

export function validateNewProject() {
    
    const form:Ref<NewProjectFormType> = ref({
        title:'',
        description:'',
        dimensions:[{width:'',height:''}],
        links:[{name:''}],
        colors:[],
        attachments:[],
        brand:'',
        deliverables:[]
      })

    const rules = computed(() => {
        return {
            title: { required },
            description: { required },
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}