from flask import Flask, render_template, request, flash
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key'

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        from_city = request.form["from"]
        to_city = request.form["to"]
        flight_class = request.form["class"]
        departure = request.form["departure"]
        return_date = request.form["return"]
        passengers = request.form["passengers"]

        try:
            dep_date = datetime.strptime(departure, "%Y-%m-%d").date()
            ret_date = datetime.strptime(return_date, "%Y-%m-%d").date()
            today = datetime.today().date()

            if from_city == to_city:
                flash("Departure and destination cannot be the same.")
            elif dep_date < today:
                flash("Departure date cannot be in the past.")
            elif ret_date < dep_date:
                flash("Return date cannot be before departure date.")
            else:
                flash(f"Successfully flights booked from {from_city} to {to_city} | {flight_class} class | {departure} - {return_date} for {passengers} passenger(s).")
        except ValueError:
            flash("Invalid date format.")

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
