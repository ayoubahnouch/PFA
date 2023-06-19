from flask import Flask, render_template, url_for, redirect, flash, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt

# create a flask instance
app = Flask(__name__) # helps flask to find all of our files in our directory here
# add database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# secret key
app.config['SECRET_KEY'] = "this is my secret key"
# initialize the database
db = SQLAlchemy()
bcrypt = Bcrypt(app)
app.app_context().push()
db.init_app(app)


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'Admin1'


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

# create Model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False, unique=True) 
    password = db.Column(db.String(80), nullable=False)

class task(db.Model,UserMixin):
     id = db.Column(db.Integer, primary_key=True)
     task=db.Column(db.String(100), nullable=False)
     start_date = db.Column(db.Date, nullable=True)
     end_date=db.Column(db.Date, nullable=True)

     def __repr__(self):
         return f"<Task {self.id}>"
     
class task(db.Model, UserMixin):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)
    # Add more columns as needed
    start_date = db.Column(db.Date, nullable=True)

task_table = db.Table('u', db.metadata, extend_existing=True)



class RegisterForm(FlaskForm):
    email = StringField(validators=[
                        InputRequired(), Length(max=50)], render_kw={"placeholder": "Enter your email", "type":"email", "autocomplete":"off"})

    password = PasswordField(validators=[
                        InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Enter your Password", "autocomplete":"off"})

    submit = SubmitField('Register')

    def validate_email(self, email):
        existing_user_email = User.query.filter_by(email=email.data).first()
        if existing_user_email:
            flash('This email exists.')


class LoginForm(FlaskForm):
    email = StringField(validators=[
                        InputRequired(), Length(max=50)], render_kw={"placeholder": "enter your email", "type":"email", "autocomplete":"off"})

    password = PasswordField(validators=[
                        InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "enter your Password", "autocomplete":"off"})

    submit = SubmitField('Login')


class Admin1Form(FlaskForm):
    email = StringField(validators=[
                        InputRequired(), Length(max=50)], render_kw={"placeholder": "enter your email", "type":"email", "autocomplete":"off"})

    password = PasswordField(validators=[
                        InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "enter your Password", "autocomplete":"off"})

    submit = SubmitField('Admin1')






@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user)
                login_user(user)
                return redirect(url_for('dashboard'))

    return render_template('login.html', form=form)


@app.route('/Admin1', methods=['GET', 'POST'])
def Admin1():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user)
                login_user(user)
                return redirect(url_for('Admin'))

    return render_template('Admin1.html', form=form)

@app.route('/Admin', methods=['GET', 'POST'])
@login_required
def Admin():
    return render_template('Admin.html')



@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    return render_template('dashboard.html')



@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()

    if form.validate_on_submit():
        existing_user_email = User.query.filter_by(email=form.email.data).first()
        if existing_user_email:
            flash('That email exists')
        else:
            hashed_password = bcrypt.generate_password_hash(form.password.data)
            new_user = User(
                email=form.email.data,
                password=hashed_password
            )
            db.session.add(new_user)
            try: 
                db.session.commit()
                return redirect(url_for('login'))
            except Exception as e:
                db.session.rollback()

    return render_template('register.html', form=form)
class User(db.Model,UserMixin):
     id=db.Column(db.Integer, primary_key=True)
     
     task=db.Column(db.String(100), nullable=False)
     start_date=db.Column(db.date, nullable=True)
     end_date=db.Column(db.date, nullable=True)

     def __repr__(self):
         return f"<Task {self.id}>"

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/calendar')
@login_required
def calendar():
    return render_template('calendar.html')
if __name__ =="__name__":
    app.run(debug=True,port=5000)

@app.route('/missag')
@login_required
def missag():
    return render_template('missag.html')
if __name__ =="__name__":
    app.run(debug=True,port=5000)

@app.route('/Profile')
@login_required
def Profile():
    return render_template('Profile.html')
if __name__ =="__name__":
    app.run(debug=True,port=5000)

@app.route('/settinges')
@login_required
def settinges():
    return render_template('settinges.html')
if __name__ =="__name__":
    app.run(debug=True,port=5000)
#create a custom error pages

#invalid url
@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


# internal server error thing
@app.errorhandler(500)
def page_not_found(e):
    return render_template("500.html"), 500


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)