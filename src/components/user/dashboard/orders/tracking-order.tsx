import { Checkout } from "@prisma/client";

interface TrackingOrderProps {
  data: Checkout;
}

const trackingStatus = [
  { status: "placed", no: "01" },
  { status: "processing", no: "02" },
  { status: "on-the-way", no: "03" },
  { status: "delivered", no: "04" },
];

export default function TrackingOrder({ data }: TrackingOrderProps) {
  const currentStepIndex = trackingStatus.findIndex(
    (step) => step.status === data.status
  );

  return (
    <div className="my-10 flex justify-evenly items-center relative">
      {trackingStatus.map((item, index) => {
        const isCompleted = index <= currentStepIndex;

        return (
          <div
            className="flex flex-col items-center relative"
            key={item.status}
          >
            {index !== 0 && (
              <div
                className={`absolute top-7 right-full w-32 h-1 ${
                  isCompleted ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}

            <div
              className={`rounded-full w-14 h-14 flex items-center justify-center text-white border-2 ${
                isCompleted
                  ? "bg-primary border-primary"
                  : "bg-white border-primary text-primary"
              }`}
            >
              {isCompleted ? (
                index === 0 ? (
                  <span className="text-xl font-bold">✔</span>
                ) : (
                  <span className="text-sm font-semibold">{item.no}</span>
                )
              ) : (
                <span className="text-sm font-semibold text-primary">{item.no}</span>
              )}
            </div>

            <span
              className={`mt-2 text-sm ${
                isCompleted ? "text-primary" : "text-gray-500"
              }`}
            >
              {item.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}
