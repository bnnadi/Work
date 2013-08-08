select userid, firstname, lastname, age
from users;

select *
from userPhone;

select userid, firstname, lastname, age
from users
where lastname = 'Smith'
and age > 23;
/* or age > 23 */

select *
from users
join userEmail on users.userId = userEmail.userId;

insert into users 
(firstname, lastname, username, password, userTypeId, userStatusId, DOB)
values
('Auther', 'Dent', 'adent', 'password',1,1,'1999/08/01');

update users set
password = 'somethingElse'
where userId = 1;

update users set
password = 'somethingElse'
where lastname = 'smith';

delete from users
where userId = 250002;
