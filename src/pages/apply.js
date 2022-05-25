import React, { useState, useContext, useEffect } from "react"
import { FirebaseContext, useAuth } from "../components/Firebase"
import Layout from "../components/layout"
import {
  Container,
  Section,
  Flex,
  Button
} from "../components/ui"
import plot from "../../docs/images/plot.png"
import "../components/common/apply.css"

const ApplyLease = () => {

  let isMounted = true

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false
    }
  }, [])

  function handleFilters() {
    if (typeof document !== "undefined") {
       let btnToggle = document.querySelector('#btn-toggle');
	     let rowCards = document.querySelector('.row-cards');
	     let mainRow = document.querySelector('.main-row');
	     let colCardAll = document.querySelectorAll('.col-card');
	     let cardAll = document.querySelectorAll('.card');

      if (!rowCards.classList.contains('is-moving')) {
        mainRow.classList.toggle("no-menu");

        for(let i=0; i<cardAll.length; i++){
          let clone = cardAll[i].cloneNode(true);
          clone.classList.add("clone");
          cardAll[i].parentElement.insertBefore(clone, cardAll[i]);

          let top = clone.getBoundingClientRect().top;
          let left = clone.getBoundingClientRect().left;
          let width = clone.getBoundingClientRect().width;
          let height = clone.getBoundingClientRect().height;


          clone.style.position = 'fixed';
          clone.style.top = top+'px';
          clone.style.left = left+'px';
          clone.style.width = width+'px';
          clone.style.height = height+'px';
        }

        document.querySelector('.col-menu').classList.toggle('col-0');
        document.querySelector('.col-menu').classList.toggle('col-4');
        document.querySelector('.col-cards').classList.toggle('col-8');
        document.querySelector('.col-cards').classList.toggle('col-12');
        for(let i=0; i<colCardAll.length; i++){
          colCardAll[i].classList.toggle('col-4');
          colCardAll[i].classList.toggle('col-6');
        }
        rowCards.classList.add('is-moving');

        let cardCloneAll = document.querySelectorAll('.card.clone');
        for(let i=0; i<cardCloneAll.length; i++){
          let top = cardAll[i].getBoundingClientRect().top;
          let left = cardAll[i].getBoundingClientRect().left;
          let width = cardAll[i].getBoundingClientRect().width;
          let height = cardAll[i].getBoundingClientRect().height;

          cardCloneAll[i].style.top = top+'px';
          cardCloneAll[i].style.left = left+'px';
          cardCloneAll[i].style.width = width+'px';
          cardCloneAll[i].style.height = height+'px';
        }

        setTimeout(function(){
          rowCards.classList.remove('is-moving');
          for(let i=0; i<cardCloneAll.length; i++){
            cardCloneAll[i].remove();
          }
        }, 1000)

      }

    }
	}

  return (
    <Layout>
      <Section padding={4} background="muted">
        <Container>
        <div class="main">
          {/**<div id="btn-toggle" onClick={handleFilters} class="btn btn-primary">Show / Hide Filters</div>*/}
          <div class="row main-row">
            {/**<div class="col-4 col-menu">
              <div class="menu-wrap">
                <div class="menu">
                  <h6 class="filter-title">Filters</h6>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <input type="checkbox" aria-label="Checkbox for following text input"/>
                      </div>
                    </div>
                    <div class="form-control">Filter 1</div>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <input type="checkbox" aria-label="Checkbox for following text input"/>
                      </div>
                    </div>
                    <div class="form-control">Filter 2</div>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <input type="checkbox" aria-label="Checkbox for following text input"/>
                      </div>
                    </div>
                    <div class="form-control">Filter 3</div>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <input type="checkbox" aria-label="Checkbox for following text input"/>
                      </div>
                    </div>
                    <div class="form-control">(Those filters don't work, it's just a pretext to have a credible interface)</div>
                  </div>
                </div>
              </div>
            </div>*/}
            <div class="col-12 col-cards">
              <div class="row row-cards">
                <div class="col-6 col-card">
                  <div class="col-card__content">
                    <div class="card">
                      <img class="card-img-top" src={plot} alt="Card image cap"/>
                      <div class="card-body">
                        <h5 class="card-title" style={{textAlign: "center"}}>Plot #1</h5>
                        <p class="card-text" style={{textAlign: "center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <Flex style={{justifyContent: "center"}}>
                          <Button>Apply</Button>
                        </Flex>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-card">
                  <div class="col-card__content">
                    <div class="card">
                      <img class="card-img-top" src={plot} alt="Card image cap"/>
                      <div class="card-body">
                      <h5 class="card-title" style={{textAlign: "center"}}>Plot #2</h5>
                      <p class="card-text" style={{textAlign: "center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <Flex style={{justifyContent: "center"}}>
                          <Button>Apply</Button>
                        </Flex>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-card">
                  <div class="col-card__content">
                    <div class="card">
                      <img class="card-img-top" src={plot} alt="Card image cap"/>
                      <div class="card-body">
                      <h5 class="card-title" style={{textAlign: "center"}}>Plot #3</h5>
                      <p class="card-text" style={{textAlign: "center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <Flex style={{justifyContent: "center"}}>
                          <Button>Apply</Button>
                        </Flex>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-card">
                  <div class="col-card__content">
                    <div class="card">
                      <img class="card-img-top" src={plot} alt="Card image cap"/>
                      <div class="card-body">
                      <h5 class="card-title" style={{textAlign: "center"}}>Plot #4</h5>
                      <p class="card-text" style={{textAlign: "center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <Flex style={{justifyContent: "center"}}>
                          <Button>Apply</Button>
                        </Flex>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-card">
                  <div class="col-card__content">
                    <div class="card">
                      <img class="card-img-top" src={plot} alt="Card image cap"/>
                      <div class="card-body">
                      <h5 class="card-title" style={{textAlign: "center"}}>Plot #5</h5>
                      <p class="card-text" style={{textAlign: "center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <Flex style={{justifyContent: "center"}}>
                          <Button>Apply</Button>
                        </Flex>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-card">
                  <div class="col-card__content">
                    <div class="card">
                      <img class="card-img-top" src={plot} alt="Card image cap"/>
                      <div class="card-body">
                      <h5 class="card-title" style={{textAlign: "center"}}>Plot #6</h5>
                      <p class="card-text" style={{textAlign: "center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <Flex style={{justifyContent: "center"}}>
                          <Button>Apply</Button>
                        </Flex>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default ApplyLease
