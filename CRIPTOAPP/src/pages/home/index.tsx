import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import styles from './home.module.css';
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

export interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  explorer: string;
  formatedPrice?: string;
  formatedMarket?: string;
  formatedVolume?: string;
}

interface DataProp {
  data: CoinProps[];
}

export function Home() {
  const [input, setInput] = useState('');
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [offset]);

  async function getData() {
    setLoading(true);
    try {
      const response = await fetch(` https://sujeitoprogramador.com/api-cripto/?key=db8c24b90f7e993b27aba4eab8b9ed6903005e385ab5d0fb54a2f865e6899a4e${offset}`)
;
      const data: DataProp = await response.json();

      const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      const priceCompact = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
      });

      const formatedResult = data.data.map((item) => ({
        ...item,
        formatedPrice: price.format(Number(item.priceUsd)),
        formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
        formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
      }));

      setCoins((prevCoins) => [...prevCoins, ...formatedResult]);
    } catch (err) {
      console.error('Erro ao buscar dados das moedas:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input) return;

    navigate(`/detail/${input}`);
  }

  function handleGetMore() {
    setOffset((prevOffset) => prevOffset + 10);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda... EX bitcoin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.map((item) => (
            <tr className={styles.tr} key={item.id}>
              <td className={styles.tdLabel} data-label="Moeda">
                <div className={styles.name}>
                  <img
                    className={styles.logo}
                    alt="Logo Cripto"
                    src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                  />
                  <Link to={`/detail/${item.id}`}>
                    <span>{item.name}</span> | {item.symbol}
                  </Link>
                </div>
              </td>

              <td className={styles.tdLabel} data-label="Valor mercado">
                {item.formatedMarket}
              </td>

              <td className={styles.tdLabel} data-label="Preço">
                {item.formatedPrice}
              </td>

              <td className={styles.tdLabel} data-label="Volume">
                {item.formatedVolume}
              </td>

              <td
                className={
                  Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss
                }
                data-label="Mudança 24h"
              >
                <span>{Number(item.changePercent24Hr).toFixed(1)}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.buttonMore} onClick={handleGetMore} disabled={loading}>
        {loading ? 'Carregando...' : 'Carregar mais'}
      </button>
    </main>
  );
}
