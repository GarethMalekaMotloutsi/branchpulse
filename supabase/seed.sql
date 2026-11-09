-- Synthetic Northline Retail Demo branch and asset data only.
insert into public.branches(store_code,name,province,city) values
 ('GP-MID-001','Midrand Central','Gauteng','Midrand'),
 ('GP-SAN-002','Sandton North','Gauteng','Sandton'),
 ('GP-PTA-003','Pretoria East','Gauteng','Pretoria')
on conflict(store_code) do nothing;

insert into public.assets(branch_id,asset_tag,display_name,category,manufacturer,model)
select b.id,v.asset_tag,v.display_name,v.category,v.manufacturer,v.model
from (values
 ('GP-MID-001','AST-1001','Front Desk Barcode Scanner','scanner','Zebra','DS2208'),
 ('GP-MID-001','AST-1002','Back Office Network Printer','printer','HP','LaserJet Pro'),
 ('GP-SAN-002','AST-2001','POS Workstation 01','workstation','Dell','OptiPlex'),
 ('GP-PTA-003','AST-3001','Branch Router','network_device','Cisco','ISR')
) as v(store_code,asset_tag,display_name,category,manufacturer,model)
join public.branches b on b.store_code=v.store_code
on conflict(asset_tag) do nothing;
