import React from 'react';
import CountUp from 'react-countup';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS modullarini ro'yxatdan o'tkazish
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
  const totalStudents = 480;
  const successRate = 97;

  const subjects = [
    { name: 'Matematika-Fizika', count: 230, color: '#007bff' },
    { name: 'Ona tili-Matematika', count: 150, color: '#28a745' },
    { name: 'Fizika-Matematika', count: 210, color: '#ffc107' }
  ];

  const chartData = {
    labels: subjects.map(sub => sub.name),
    datasets: [
      {
        label: 'Abituryentlar soni',
        data: subjects.map(sub => sub.count),
        backgroundColor: subjects.map(sub => sub.color),
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Fanlar bo‘yicha statistikalar',
        font: {
          size: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 250
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 O‘quv Markaz Statistikasi – 2025</h2>

      <div style={styles.counters}>
        <div style={styles.counterBox}>
          🎓 <CountUp end={successRate} duration={2} suffix="%" style={styles.counter} />
          <div>talaba bo‘ldi</div>
        </div>

        <div style={styles.counterBox}>
          👥 <CountUp end={totalStudents} duration={2} style={styles.counter} />
          <div>jami abituryent</div>
        </div>
      </div>

      <div style={styles.chartBox}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px'
  },
  counters: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px'
  },
  counterBox: {
    fontSize: '22px',
    fontWeight: '500'
  },
  counter: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#007bff'
  },
  chartBox: {
    marginTop: '30px'
  }
};

export default Statistics;
