<template>
    <div class="fs-32 lh-38 text-blue position-absolute gilroy-bold" v-if="!route?.meta?.hideLogo">spark</div>
    <div class="mtpx-100">
        <ul class="navbar-nav">
            <li class="nav-item my-1" v-for="(link, i) in links" :key="i">
                <!-- <a class="nav-link d-flex" :class="[isActive(link.location)]" :href="link.location || '#'"> -->
                <a class="nav-link d-flex" :class="[isActive(link.location)]" href="#" @click.stop="goTo(link)">
                    <div class="d-flex my-auto flex-grow-1">
                        <span class="d-flex my-auto justify-content-center wpx-26 hpx-27 rounded-circle bg-blue-lt-1">
                            <i class="material-icons-outlined my-auto text-blue fs-15">{{ link.icon }}</i>
                        </span>
                        <span class="text-name my-auto fs-14 lh-15 gilroy-medium text-blue-dk-1 ms-2 text-uppercase">{{link.name }}</span>
                    </div>
                </a>
            </li>
        </ul>
    </div>
    <div class="order d-flex flex-column align-items-center wpx-211 hpx-305 mt-5 px-3">
        <img src="@/assets/img/clients/sidebarImg2.svg" class="wpx-82 hpx-85 mt-5" />
        <div class="gilroy-regular fs-14 lh-16 text-white text-center mt-4" v-if="route.meta.menuItemsToShow=='client'">
            Refer Spark to Friends & Family and get paid <span class="gilroy-medium">N5,000</span> everytime they use <span class="gilroy-medium">Spark</span>
        </div>
        <div class="gilroy-regular fs-14 lh-16 text-white text-center mt-4" v-if="route.meta.menuItemsToShow=='affiliate'">
            Unlimited graphic design made easy with <span class="gilroy-medium">Spark</span>
        </div>

        <FormButton label="REFER NOW" class="hpx-40 border-0 rounded-px-5 mt-5" variant="yellow" v-if="route.meta.menuItemsToShow=='client'"/>
        <FormButton label="USE STECKER" class="hpx-40 border-0 rounded-px-5 mt-5" variant="yellow" v-if="route.meta.menuItemsToShow=='affiliate'"/>
    </div>

</template>


<script lang="ts" setup>
    import { ref,computed, Ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import AuthService from '@/services/auth-service'
    
  const route = useRoute();
  const router = useRouter();

    interface badgeType {
      value: string | number;
      bgColor: string;
    }
    interface subMenuType {
      name: string;
      location?: string;
      routeName?: string;
      badge?: badgeType;
    }
    interface menuType {
      name: string;
      icon: string;
      location?: string;
      routeName?: string;
      logout?: boolean;
      subMenus?: subMenuType[];
    }
    
    const clientLinks: Ref<menuType[]> = ref([
      { name: 'Dashboard', icon: 'home', location: '/clients/dashboard', routeName:'Clients.Dashboard' },
      { name: 'Request', icon: 'event_note', location: '/clients/request', routeName:'Clients.Request' },
      { name: 'Brand', icon: 'discount', location: '/clients/brand', routeName:'Clients.Brand' },
      { name: 'Switch To Affiliate', icon: 'swap_horiz', location: '/affiliate/dashboard', routeName:'Affiliate.Dashboard' },
      { name: 'Workspace & Team', icon: 'groups', location: '/clients/workspace', routeName:'Clients.Workspace' },
      { name: 'My Plans & Billings', icon: 'payments', location: '/clients/plans', routeName:'Clients.Plans' },
      { name: 'Log Out', icon: 'power_settings_new', location: '', logout:true },
    ]);
    const affiliateLinks: Ref<menuType[]> = ref([
      { name: 'Dashboard', icon: 'home', location: '/affiliate/dashboard', routeName:'Affiliate.Dashboard'  },
      { name: 'Profile', icon: 'person_outline', location: '/affiliate/profile', routeName:'Affiliate.Profile'  },
      { name: 'Withdrawal', icon: 'discount', location: '/affiliate/withdrawal', routeName:'Affiliate.Withdrawal'  },
      { name: 'Switch To Client', icon: 'swap_horiz', location: '/clients/dashboard', routeName:'Clients.Dashboard' },
      { name: 'Log Out', icon: 'power_settings_new', location: '', logout:true },
    ]);
    const links = computed(()=>{
        safeLog(route.meta.menuItemsToShow)
        return route.meta.menuItemsToShow == 'client' ? clientLinks.value : affiliateLinks.value
    })

    const isActive = (paths: string | subMenuType[] | undefined) => {
      if (Array.isArray(paths)) {
        let locations = paths.map(path => path.location);
        return {
          active: locations.includes(route.path)
        };
      }
      return {active: paths == route.path};
    };
    const goTo = (link:menuType)=>{
      if(link.logout){
        AuthService.logOut()
        router.push({name:"Auth.Login"})
      } else {
        router.push({name:link.routeName})
      }
    }
    </script>

    <style lang="scss" scoped>
        .nav-link {

            &.active,
            &:hover {
                .text-name{
                    color: var(--spa-color-blue) !important;
                    font-family: 'Gilroy-Bold';
                }
            }
        }
        .order{
            background-image: url(@/assets/img/clients/sidebarImg.svg);
            border-radius: 24px;
        }
    </style>