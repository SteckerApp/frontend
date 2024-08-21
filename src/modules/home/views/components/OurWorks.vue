<template>
    <div class="works d-flex flex-column animate__animated animate__fadeInUp six animate__slower">
        <div class="container">
            <div class="title mx-auto mb-5 text-center">Our works</div>
            <div class="work_portfolio_scroller">
                <div class="work_portfolio_images">
                    <div class="work_portfolio_item work_portfolio_sub">
                        <img src="@/assets/img/home/works/Social.svg" alt="Social" class="img-fluid"/>
                        <img src="@/assets/img/home/works/logo.svg" alt="Logo" class="img-fluid"/>
                    </div>
                    <div class="work_portfolio_item">
                        <img src="@/assets/img/home/works/packaging.svg" alt="Packaging" height="40px" class="img-fluid" />
                    </div>
                    <div class="work_portfolio_item work_portfolio_right">
                        <img src="@/assets/img/home/works/print.svg" alt="Print" class="img-fluid"/>
                        <router-link 
                            to="/works" 
                            class="text-decoration-none gilroy-medium work_title p-4 linksHoverYellow rounded-px-10 perfect-center cursor-pointer"
                        >
                            See more design samples
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
const portfolio = [
    {
        title: 'Design 1',
        img: 'work1.jpg',
    }
]
</script>

<style lang="scss" scoped>
    .work_portfolio_scroller {
        overflow-x: auto;
        white-space: nowrap;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
    }

    .work_portfolio_images {
        display: flex;
        gap: 20px;
        white-space: nowrap;
        scroll-snap-align: start;
    }

    .work_portfolio_item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        scroll-snap-align: start;
        min-width: 300px;
        gap: 20px;
        overflow: hidden;
    }

    .img-fluid {
        width: 100%;
        height: auto;
        object-fit: cover;
        transition: transform 0.4s ease;
    }

    .work_portfolio_item:hover .img-fluid {
        transform: scale(1.05);
    }

    .work_title {
        font-size: 20px;
        width: 100%;
        font-family: gilroy-medium;
        text-align: center;
    }

    .img-fluid:hover {
        transform: scale(1.1);
    }

    .works {
        margin-top: 100px;
    }

    .title {
        font-size: 60px;
        font-family: gilroy-medium;
    }

    @media (max-width: 768px) {
        .work_portfolio_scroller {
            display: flex;
            flex-direction: row;
            overflow-x: scroll;
        }

        .work_portfolio_item {
            min-width: 80%;
        }
        
        .work_title {
            font-size: 16px;
        }
        
        .title {
            font-size: 40px;
            font-family: gilroy-bold;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        .work_portfolio_images {
            flex-wrap: wrap;
        }

        .work_portfolio_item {
            min-width: calc(50% - 20px);
        }

        .title {
            font-size: 50px;
        }

        .work_title {
            font-size: 18px;
        }
    }

    @media (min-width: 1024px) {
        .work_portfolio_scroller {
            overflow-x: hidden;
        }

        .work_portfolio_images {
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .work_portfolio_item {
            min-width: calc(33.33% - 20px);
        }

        .title {
            font-size: 60px;
        }
    }
</style>
