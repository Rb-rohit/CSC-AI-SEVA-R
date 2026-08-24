import {
  ArrowUpRight,
  CircleCheck,
} from 'lucide-react'

const QR_TILES = [
  '1111111010101111111',
  '1000001011101000001',
  '1011101010101011101',
  '1011101001011011101',
  '1011101010111011101',
  '1000001011011000001',
  '1111111010101111111',
  '0000000011100000000',
  '1101011110111010111',
  '0010110011001010010',
  '1110011110111110101',
  '0101100011100011010',
  '1111111010111010101',
  '1000001001100011100',
  '1011101010111110011',
  '1011101001000010100',
  '1011101011111011110',
  '1000001000101010001',
  '1111111011101010111',
]

export default function DigitalCard() {
  return (
    <section
      className="card qr-card dashboard-hover-card"
    >
      <div>
        <div className="section-title">
          CSC digital card
        </div>

        <p className="insight-sub">
          Let customers scan to save your
          center contact.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            marginBottom: 12,
            fontSize: 11,
            color: 'var(--muted)',
          }}
        >
          <CircleCheck
            size={14}
            color="var(--green)"
          />

          <span>
            Center profile ready
          </span>
        </div>

        <button
          type="button"
          className="btn btn-outline btn-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          Download QR
          <ArrowUpRight size={13} />
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <div
          className="qr-code"
          aria-label="CSC profile QR code"
        >
          {QR_TILES.flatMap(
            (row, rowIndex) =>
              row.split('').map(
                (
                  tile,
                  columnIndex
                ) => (
                  <i
                    key={`${rowIndex}-${columnIndex}`}
                    className={
                      tile === '1'
                        ? 'filled'
                        : ''
                    }
                  />
                )
              )
          )}
        </div>

        <span
          style={{
            fontSize: 10,
            color: 'var(--muted)',
          }}
        >
          Scan to save contact
        </span>
      </div>
    </section>
  )
}