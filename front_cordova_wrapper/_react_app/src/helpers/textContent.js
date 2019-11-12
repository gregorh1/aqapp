import React from 'react';
import caqiTable from '../../assets/img/caqi-table.png'

const texts = {
    caqi: (
        <div>
            <p>
                W celu zaprezentoawnia inoframacji o jakości powietrza
                w sposób porównywalny i zrozumiały, wszystkie szczegółowe pomiary są przekształcane w
                jedną liczbę: Wspólny Indeks Jakości Powietrza (Common Air Quality Index - CAQI).
            </p>
            <p>
                Index jest budowany według tabeli:
            </p>
            <img src={caqiTable} alt='CAQI'></img>
            <p>
                Więcej informacji możesz znaleźć na stronie:&nbsp;
                <a href="http://airqualitynow.eu/pl/about_indices_definition.php" target='_blank'>airqualitynow.eu</a>
            </p>
        </div>
    ),
    pm25: (
        <div>
            <p>
                PM2.5 to najbardziej szkodliwe zanieczyszczenie, to aerozole atmosferyczne, których średnica jest nie większa niż 2.5 mikrometra.
            </p>
            <p>
                Tego rodzaju pył zawieszony jest uznawany za najgroźniejszy dla zdrowia człowieka.
                Wszystko dlatego, że pył jest bardzo drobny, a w takiej postaci może się przedostać bezpośrednio do krwiobiegu.
            </p>
            <p>
                To właśnie ten rodzaj pyłu zawieszonego jest odpowiedzialny za:
            </p>
            <ul>
                <li>
                    nasilenie astmy
                </li>
                <li>
                    osłabienie czynności płuc
                </li>
                <li>
                    nowotwory płuc, gardła i krtani
                </li>
                <li>
                    zaburzenia rytmu serca
                </li>
                <li>
                    zapalenie naczyń krwionośnych
                </li>
                <li>
                    miażdżycę
                </li>
                <li>
                    niższą masą urodzeniową dziecka i problemy z oddychaniem, gdy było ono narażone na kontakt z pyłami w trakcie rozwoju płodowego
                </li>
                <li>
                    nasilenie objawów chorób związanych z układem krwionośnym i oddechowym.
                </li>
            </ul>
            <p>
                Pył zawieszony PM2.5 posiada odpowiednie normy, po których przekroczeniu ogłaszany jest alarm.
                W związku z tym wielu osobom wydaje się, że zwykłe powietrze jest od niego wolne, jednak to nieprawda.
            </p>
            <p>
                W Polsce za normę uważa się niestety stężenia dosyć wysokie, a w niektórych miejscach alarm nie jest zbytnio nagłaśniany,
                bądź też ogłaszany tak często, że niewielu ludzi się tym przejmuje.
            </p>
            <p>
                Na przykład w Krakowie rzadko można zauważyć osoby w maskach antysmogowych, chociaż powietrze jest naprawdę złej jakości.
            </p>
            <p>
                Warto dodać – dla jasności – że WHO ustaliło normę średniego dobowego stężenia pyłu zawieszonego PM2.5 na 25 mikrogramów na metr sześcienny,
                a roczna norma to 10 mikrogramów na metr sześcienny.
            </p>
            <p>
                Źródło: <a href='https://airly.eu/pl/pyl-zawieszony-czym-jest-pm10-a-czym-pm2-5-aerozole-atmosferyczne' target='_blank'>airly.pl</a>
            </p>
        </div>
    ),
    pm10: (
        <div>
            <p>
                PM10 to mieszanina zawieszonych w powietrzu cząsteczek, których średnica nie przekracza 10 mikrogramów.
            </p>
            <p>
                Jest szkodliwy z uwagi na zawartość takich elementów jak benzopireny, furany, dioksyny – jednym słowem, rakotwórcze metale ciężkie.
            </p>
            <p>
                Norma średniego, dobowego stężenia tego pyłu wynosi według WHO 50 mikrogramów na metr sześcienny, a roczna 20 mikrogramów na metr sześcienny.
            </p>
            <p>
                Warto jednak wiedzieć, że informację o przekroczonych normach ogłasza się,
                gdy dobowe stężenie PM10 wyniesie 200 mikrogramów na metr sześcienny – widać więc doskonale jak często wszyscy myślimy,
                że powietrze jest w porządku, podczas gdy jest ono bardzo zanieczyszczone, jednak nie został jeszcze osiągnięty poziom alarmowy.
            </p>
            <p>
                PM10 to pył zawieszony, który przede wszystkim wpływa negatywnie na układ oddechowy.
            </p>
            <p>
                To właśnie on odpowiada za ataki kaszlu, świszczący oddech, pogorszenie się stanu osób z astmą czy za ostre, gwałtowne zapalenie oskrzeli.
            </p>
            <p>
                W sposób pośredni PM10 wpływa również negatywnie na resztę organizmu, między innymi zwiększając ryzyko zawału serca oraz wystąpienia udaru mózgu.
            </p>
            <p>
                Benzopiren jest również silnie rakotwórczy. Jak zatem widać, aerozole atmosferyczne tego typu są bardzo szkodliwe dla człowieka.
            </p>
            <p>
                Źródło: <a href='https://airly.eu/pl/pyl-zawieszony-czym-jest-pm10-a-czym-pm2-5-aerozole-atmosferyczne' target='_blank'>airly.pl</a>
            </p>
        </div>
    )

}

export default texts
