/**
 * 🅿️ City Central Parking
 *
 * City Central Parking garage is the busiest in downtown. They need an
 * automated system to calculate parking fees. Different vehicle types
 * have different rates, and there's a daily maximum so customers
 * aren't overcharged.
 *
 * Rates (first hour / each additional hour):
 *   - "car":        $5 first hour, then $3/hour
 *   - "motorcycle": $3 first hour, then $2/hour
 *   - "bus":        $10 first hour, then $7/hour
 *
 * Daily Maximum (fee can never exceed this):
 *   - "car":        $30
 *   - "motorcycle": $18
 *   - "bus":        $60
 *
 * Rules:
 *   - Partial hours are rounded UP (e.g., 1.5 hours → 2 hours)
 *   - The fee should never exceed the daily maximum
 *   - If hours is 0 or negative, return -1
 *   - If vehicleType is not "car", "motorcycle", or "bus", return -1
 *
 * Examples:
 *   - car, 1 hour     → $5
 *   - car, 3 hours    → $5 + $3 + $3 = $11
 *   - car, 0.5 hours  → rounds up to 1 hour → $5
 *   - car, 24 hours   → $5 + 23×$3 = $74 → capped at $30
 *
 * @param {number} hours - Number of hours parked
 * @param {string} vehicleType - "car", "motorcycle", or "bus"
 * @returns {number} Parking fee or -1 for invalid input
 */
export function calculateParkingFee(hours, vehicleType) {
  
  // vehicle list
  let vehicleList = [
    { type: "car", fee: 5, recurFee: 3, maximumFee: 30 },
    { type: "motorcycle", fee: 3, recurFee: 2, maximumFee: 18 },
    { type: "bus", fee: 10, recurFee: 7, maximumFee: 60 }
  ];

  // input validations
  if(!Number.isFinite(hours) || hours <= 0) return -1;
  if(typeof vehicleType !== "string" || vehicleType.trim().length === 0) return -1;

  let vehicle = vehicleList.find(v => v.type === vehicleType);
  if(!vehicle) return -1;

  // conditionals
  let parkingFee = 0;

  if(vehicle.type === vehicleType) {
    if(hours > 0 && hours <= 1) parkingFee = vehicle.fee;
    else parkingFee = vehicle.fee + (vehicle.recurFee * Math.ceil(hours - 1));

    if(parkingFee > vehicle.maximumFee) {
      parkingFee = vehicle.maximumFee;
    }
  }

  return parkingFee;
}
