
--I  created dummy data for product_id,floor and machine_id
-------------------------------Reduces quantity after customer selection
UPDATE MACHINE_ITEMS
SET Quantity = quantity-1
where machine_id='3d330f10-4253-11ec-8e54-b05adad3c217'
and PRODUCT_ID='2566a5de-4252-11ec-8e54-b05adad3c217'
and QUANTITY>0
---------------SAME_FLOOR_SUGGESTION---------------------------------------------------------
select MACHINE_NUMBER,floor from vending_machines
where MACHINE_ID in (select mi.M_ID from MACHINE_ITEMS mi,vending_machines v where v.MACHINE_ID =mi.M_ID and
 v.floor =1 and mi.product_id='2566a5de-4252-11ec-8e54-b05adad3c217' and quantity>0)
 order by MACHINE_NUMBER asc

--------------ABOVE_FLOOR_SUGGESTION-------------------------------------------------------
select MACHINE_NUMBER,floor from vending_machines
where  MACHINE_ID in(select mi.M_ID from MACHINE_ITEMS mi,vending_machines v where v.MACHINE_ID =mi.M_ID and
 v.floor >1 and mi.product_id='2566a5de-4252-11ec-8e54-b05adad3c217' and quantity>0)
 order by MACHINE_NUMBER asc
limit 1;
-----------------Below_Floor_Suggestion-----------------------------------------------------------------------

select MACHINE_NUMBER,floor from vending_machines
where  MACHINE_ID in(select mi.M_ID from MACHINE_ITEMS mi,vending_machines v where v.MACHINE_ID =mi.M_ID and
 v.floor <2 and mi.product_id='256884a7-4252-11ec-8e54-b05adad3c217' and quantity>0)
 order by MACHINE_NUMBER asc
limit 1;